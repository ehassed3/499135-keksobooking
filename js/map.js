'use strict';

(function () {
  var PIN_MAIN_SPIRE_HEIGHT = 22;
  var ENTER_KEYCODE = 13;

  var map = document.querySelector('.map');
  var mapListElement = map.querySelector('.map__pins');
  var mapPinMain = map.querySelector('.map__pin--main');
  var noticeForm = document.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

  var openPage = function () {
    var mapPinsSide = mapListElement.querySelectorAll('.map__pin:not(.map__pin--main)');
    map.classList.remove('map--faded');

    for (var i = 0; i < mapPinsSide.length; i++) {
      mapPinsSide[i].classList.remove('hidden');
    }

    noticeForm.classList.remove('notice__form--disabled');
    window.form.disableFieldset(noticeFields, false);
  };

  mapPinMain.addEventListener('mouseup', function () {
    openPage();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPage();
    }
  });

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
