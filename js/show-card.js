'use strict';

(function () {
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
  var PIN_HEIGHT = 38;

  var map = document.querySelector('.map');
  var mapListElement = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');

  var replacePopup = function (target) {
    for (var i = 0; i < window.data.value.length; i++) {
      var x = parseInt(target.style.left, 0);
      var y = parseInt(target.style.top, 0) + PIN_HEIGHT;
      if (x === window.data.value[i].location.x && y === window.data.value[i].location.y) {
        var fragment = document.createDocumentFragment();

        fragment.appendChild(window.card.renderMapCard(window.data.value[i]));

        mapListElement.appendChild(fragment);

        var popup = mapListElement.querySelector('.popup');
        mapListElement.insertBefore(popup, mapPinMain);
        break;
      }
    }
  };

  var closePopup = function () {
    var popup = mapListElement.querySelector('.popup');
    var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');

    mapListElement.removeChild(popup);
    for (var i = 0; i < mapPinsSide.length; i++) {
      mapPinsSide[i].classList.remove('map__pin--active');
    }
  };

  var popupEscPressHandler = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup();
    }
  };

  var addEventCloseCard = function (evt) {
    var popup = mapListElement.querySelector('.popup');
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

  window.showCard = function (evt) {
    var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    var pinsOverlay = mapListElement.querySelector('.map__pinsoverlay');
    var popup = mapListElement.querySelector('.popup');
    var target = evt.target;

    if (pinsOverlay.nextElementSibling === popup) {
      mapListElement.removeChild(popup);
    }

    while (target !== mapListElement) {
      if (target.className === 'map__pin') {
        for (var i = 0; i < mapPinsSide.length; i++) {
          mapPinsSide[i].classList.remove('map__pin--active');
        }

        target.classList.add('map__pin--active');

        replacePopup(target);

        document.addEventListener('keydown', popupEscPressHandler);

        break;
      }

      target = target.parentNode;
    }

    addEventCloseCard(evt);
  };
})();
