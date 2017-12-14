'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PIN_HEIGHT = 38;

  var map = document.querySelector('.map');
  var mapListElement = map.querySelector('.map__pins');
  var listOfRentals;

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; width: 100%; z-index: 100; font-size: 50px; text-align: center; color: red;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(function (data) {
    listOfRentals = data;
  }, errorHandler);

  var replacePopup = function (target) {
    var popup = mapListElement.querySelector('.popup');
    for (var i = 0; i < listOfRentals.length; i++) {
      var x = parseInt(target.style.left, 0);
      var y = parseInt(target.style.top, 0) + PIN_HEIGHT;
      if (x === listOfRentals[i].location.x && y === listOfRentals[i].location.y) {
        window.card.renderPopup(popup, listOfRentals[i]);
        break;
      }
    }
  };

  var closePopup = function () {
    var popup = mapListElement.querySelector('.popup');
    var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');

    popup.classList.add('hidden');
    for (var i = 0; i < mapPinsSide.length; i++) {
      mapPinsSide[i].classList.remove('map__pin--active');
    }
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  window.showCard = function (evt) {
    var popup = mapListElement.querySelector('.popup');
    var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
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
      closePopup();
    });

    popupClosingElement.addEventListener('keydown', function () {
      if (evt.keyCode === ENTER_KEYCODE) {
        closePopup();
      }
    });
  };
})();
