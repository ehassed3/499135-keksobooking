'use strict';

(function () {
  var PIN_SPIRE_HEIGHT = 18;
  var ENTER_KEYCODE = 13;
  var NUMBER_PINS = 5;

  var map = document.querySelector('.map');
  var mapListElement = map.querySelector('.map__pins');

  var renderPin = function (element) {
    var template = document.querySelector('template').content;
    var mapPin = template.querySelector('.map__pin').cloneNode(true);
    var pinImage = mapPin.querySelector('img');

    mapPin.style.left = element.location.x + 'px';
    mapPin.style.top = element.location.y - (pinImage.height / 2 + PIN_SPIRE_HEIGHT) + 'px';
    pinImage.src = element.author.avatar;

    return mapPin;
  };

  window.pin = {
    add: function (listOfRentals) {
      var fragment = document.createDocumentFragment();
      var numberPins = (listOfRentals.length > NUMBER_PINS) ? NUMBER_PINS : listOfRentals.length;

      for (var i = 0; i < numberPins; i++) {
        fragment.appendChild(renderPin(listOfRentals[i]));
      }

      mapListElement.appendChild(fragment);
    },

    remove: function () {
      var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
      Array.from(mapPinsSide).forEach(function (pin) {
        mapListElement.removeChild(pin);
      });
    },

    pressPinSide: function () {
      var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');

      Array.from(mapPinsSide).forEach(function (pin) {
        pin.addEventListener('click', function (evt) {
          window.showCard(evt);
        });

        pin.addEventListener('keydown', function (evt) {
          if (evt.keyCode === ENTER_KEYCODE) {
            window.showCard(evt);
          }
        });
      });
    }
  };
})();
