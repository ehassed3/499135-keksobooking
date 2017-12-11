'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  var map = document.querySelector('.map');
  var mapListElement = map.querySelector('.map__pins');
  var popup = mapListElement.querySelector('.popup');
  var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');

  var replacePopup = function (target) {
    for (var i = 0; i < window.data.listOfRentals.length; i++) {
      if (target.firstChild.getAttribute('src') === window.data.listOfRentals[i].author.avatar) {
        window.card.renderPopup(popup, window.data.listOfRentals[i]);
      }
    }
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.map.closePopup(evt);
    }
  };

  window.showCard = function (evt) {
    var target = evt.target;

    while (target !== mapListElement) {
      if (target.className === 'map__pin') {
        for (var i = 0; i < mapPinsSide.length; i++) {
          mapPinsSide[i].classList.remove('map__pin--active');
        }

        target.classList.add('map__pin--active');
        popup.classList.remove('hidden');

        replacePopup(target);

        document.addEventListener('keydown', popupEscPressHandler);

        break;
      }

      target = target.parentNode;
    }

    var popupClosingElement = popup.querySelector('.popup__close');

    popupClosingElement.addEventListener('click', function () {
      window.map.closePopup();
    });

    popupClosingElement.addEventListener('keydown', function () {
      if (evt.keyCode === ENTER_KEYCODE) {
        window.map.closePopup(evt);
      }
    });
  };
})();
