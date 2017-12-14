'use strict';

(function () {
  var CARD_RENDER_NUMBER = 0;
  var PIN_MAIN_SPIRE_HEIGHT = 22;

  var map = document.querySelector('.map');
  var mapListElement = map.querySelector('.map__pins');

  var createMapElements = function (arrObjects) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < arrObjects.length; i++) {
      fragment.appendChild(window.pin.renderMapPin(arrObjects[i]));
    }

    fragment.appendChild(window.card.renderMapCard(arrObjects[CARD_RENDER_NUMBER]));

    mapListElement.appendChild(fragment);
  };

  createMapElements(window.data.listOfRentals);

  var popup = mapListElement.querySelector('.popup');
  var mapPinMain = map.querySelector('.map__pin--main');
  mapListElement.insertBefore(popup, mapPinMain);
  popup.classList.add('hidden');

  var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

  window.map = {
    openPage: function () {
      map.classList.remove('map--faded');

      for (var i = 0; i < mapPinsSide.length; i++) {
        mapPinsSide[i].classList.remove('hidden');
      }

      noticeForm.classList.remove('notice__form--disabled');
      window.form.disableFieldset(noticeFields, false);
    },

    closePopup: function () {
      popup.classList.add('hidden');
      for (var i = 0; i < mapPinsSide.length; i++) {
        mapPinsSide[i].classList.remove('map__pin--active');
      }
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var pinMainImage = mapPinMain.querySelector('img');

    var shift = {
      x: evt.clientX - mapPinMain.offsetLeft,
      y: evt.clientY - mapPinMain.offsetTop
    };

    var mouseMoveHandler = function (moveEvt) {
      moveEvt.preventDefault();

      var coordinate = {
        x: moveEvt.clientX - shift.x,
        y: moveEvt.clientY - shift.y
      };

      mapPinMain.style.left = coordinate.x + 'px';
      mapPinMain.style.top = coordinate.y + 'px';

      var inputAddress = noticeForm.querySelector('#address');
      inputAddress.value = 'x: ' + mapPinMain.style.left + ', y: ' + (parseInt(mapPinMain.style.top, 0) + pinMainImage.height / 2 + PIN_MAIN_SPIRE_HEIGHT);
    };

    var mouseUpHandler = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', mouseMoveHandler);
      document.removeEventListener('mouseup', mouseUpHandler);
    };

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('mouseup', mouseUpHandler);
  });
})();
