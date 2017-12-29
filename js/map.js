'use strict';

(function () {
  var PIN_MAIN_SPIRE_HEIGHT = 22;
  var ENTER_KEYCODE = 13;
  var COORDINATE_Y_MIN = 100;
  var COORDINATE_Y_MAX = 500;

  var map = document.querySelector('.map');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

  var renderMap = function (listOfRentals) {
    map.classList.remove('map--faded');
    window.pin.add(listOfRentals);

    noticeForm.classList.remove('notice__form--disabled');
    window.form.disableFieldset(noticeFields, false);
    window.pin.pressPinSide();
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

    var filters = document.querySelector('.map__filters');

    filters.addEventListener('change', function () {
      var applyFilter = function () {
        window.filter(window.data.value);
      };

      window.debounce(applyFilter);
    });
  }, window.error);

  window.map = {
    fillAddress: function () {
      var inputAddress = noticeForm.querySelector('#address');
      var pinMainImage = mapPinMain.querySelector('img');

      inputAddress.value = 'x: ' + mapPinMain.offsetLeft + ', y: ' + (mapPinMain.offsetTop + pinMainImage.height / 2 + PIN_MAIN_SPIRE_HEIGHT);
    }
  };

  mapPinMain.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var inputAddress = noticeForm.querySelector('#address');
    var pinMainImage = mapPinMain.querySelector('img');

    window.map.fillAddress();

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

      if (coordinate.y < COORDINATE_Y_MIN - (pinMainImage.height / 2 + PIN_MAIN_SPIRE_HEIGHT)) {
        coordinate.y = COORDINATE_Y_MIN - (pinMainImage.height / 2 + PIN_MAIN_SPIRE_HEIGHT);
      } else if (coordinate.y > COORDINATE_Y_MAX - (pinMainImage.height / 2 + PIN_MAIN_SPIRE_HEIGHT)) {
        coordinate.y = COORDINATE_Y_MAX - (pinMainImage.height / 2 + PIN_MAIN_SPIRE_HEIGHT);
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
