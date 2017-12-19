'use strict';

(function () {
  var PIN_MAIN_SPIRE_HEIGHT = 22;
  var ENTER_KEYCODE = 13;

  var map = document.querySelector('.map');
  var mapListElement = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

  var renderMap = function (listOfRentals) {
    map.classList.remove('map--faded');
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < listOfRentals.length; i++) {
      fragment.appendChild(window.pin.renderMapPin(listOfRentals[i]));
    }

    mapListElement.appendChild(fragment);

    noticeForm.classList.remove('notice__form--disabled');
    window.form.disableFieldset(noticeFields, false);
    window.pin.pressPinSide();
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; z-index: 100; font-size: 30px; text-align: center; color: red; background-color: black; opacity: 0.8; width: 1200px;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(function (data) {
    window.data(data);

    var pinMouseUpHandler = function () {
      renderMap(window.data.value);
      mapPinMain.removeEventListener('mouseup', pinMouseUpHandler);
    };

    mapPinMain.addEventListener('mouseup', pinMouseUpHandler);

    var pinKeyDownHandler = function (evt) {
      if (evt.keyCode === ENTER_KEYCODE) {
        renderMap(window.data.value);
        mapPinMain.removeEventListener('keydown', pinKeyDownHandler);
      }
    };

    mapPinMain.addEventListener('keydown', pinKeyDownHandler);
  }, errorHandler);

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var inputAddress = noticeForm.querySelector('#address');
    var pinMainImage = mapPinMain.querySelector('img');

    inputAddress.value = 'x: ' + mapPinMain.offsetLeft + ', y: ' + (mapPinMain.offsetTop + pinMainImage.height / 2 + PIN_MAIN_SPIRE_HEIGHT);

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

      if (coordinate.y < 100) {
        coordinate.y = 100;
      } else if (coordinate.y > 500) {
        coordinate.y = 500;
      }

      mapPinMain.style.left = coordinate.x + 'px';
      mapPinMain.style.top = coordinate.y + 'px';

      inputAddress.value = 'x: ' + parseInt(mapPinMain.style.left, 0) + ', y: ' + (parseInt(mapPinMain.style.top, 0) + pinMainImage.height / 2 + PIN_MAIN_SPIRE_HEIGHT);
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
