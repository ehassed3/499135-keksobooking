'use strict';

(function () {
  var PIN_SPIRE_HEIGHT = 18;
  var ENTER_KEYCODE = 13;

  var renderPin = function (parent, element) {
    var pinImage = parent.querySelector('img');

    parent.style.left = element.location.x + 'px';
    parent.style.top = element.location.y - (pinImage.height / 2 + PIN_SPIRE_HEIGHT) + 'px';
    pinImage.setAttribute('src', element.author.avatar);
    parent.classList.add('hidden');
  };

  window.pin = {
    renderMapPin: function (element) {
      var template = document.querySelector('template').content;
      var mapPin = template.querySelector('.map__pin').cloneNode(true);

      renderPin(mapPin, element);

      return mapPin;
    }
  };

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');

  mapPinMain.addEventListener('mouseup', function () {
    window.map.openPage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.map.openPage();
    }
  });

  var mapListElement = map.querySelector('.map__pins');

  mapListElement.addEventListener('click', function (evt) {
    window.showCard(evt);
  });

  mapListElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      window.showCard(evt);
    }
  });
})();
