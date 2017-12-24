'use strict';

(function () {
  var PIN_SPIRE_HEIGHT = 18;
  var ENTER_KEYCODE = 13;

  var map = document.querySelector('.map');
  var mapListElement = map.querySelector('.map__pins');

  var renderPin = function (parent, element) {
    var pinImage = parent.querySelector('img');

    parent.style.left = element.location.x + 'px';
    parent.style.top = element.location.y - (pinImage.height / 2 + PIN_SPIRE_HEIGHT) + 'px';
    pinImage.setAttribute('src', element.author.avatar);
  };

  window.pin = {
    renderMapPin: function (element) {
      var template = document.querySelector('template').content;
      var mapPin = template.querySelector('.map__pin').cloneNode(true);

      renderPin(mapPin, element);

      return mapPin;
    },

    addMapPin: function (listOfRentals, numberPins) {
      var fragment = document.createDocumentFragment();

      for (var i = 0; i < numberPins; i++) {
        fragment.appendChild(window.pin.renderMapPin(listOfRentals[i]));
      }

      mapListElement.appendChild(fragment);
    },

    removeMapPin: function () {
      var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      for (var i = 0; i < mapPinsSide.length; i++) {
        mapListElement.removeChild(mapPinsSide[i]);
      }
    },

    pressPinSide: function () {
      var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');

      for (var i = 0; i < mapPinsSide.length; i++) {
        mapPinsSide[i].addEventListener('click', function (evt) {
          window.showCard(evt);
        });

        mapPinsSide[i].addEventListener('keydown', function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            window.showCard(evt);
          }
        });
      }
    }
  };
})();
