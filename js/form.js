'use strict';

(function () {
  var TAB_KEYCODE = 9;
  var VALUES_SELECT_TIME = ['12:00', '13:00', '14:00'];
  var VALUES_SELECT_TYPE = ['flat', 'bungalo', 'house', 'palace'];
  var MIN_INPUT_PRICE = [1000, 0, 5000, 10000];

  var noticeForm = document.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

  window.form = {
    disableFieldset: function (elementsForm, disabled) {
      Array.from(elementsForm).forEach(function (element) {
        element.disabled = disabled;
      });
    }
  };

  window.form.disableFieldset(noticeFields, true);

  var inputAddress = noticeForm.querySelector('#address');

  var checkValidationInputAddress = function () {
    inputAddress.required = 'required';
    inputAddress.addEventListener('keydown', function (evt) {
      if (evt.keyCode !== TAB_KEYCODE) {
        evt.preventDefault();
      }
    });
    inputAddress.addEventListener('paste', function (evt) {
      evt.preventDefault();
    });
    inputAddress.addEventListener('cut', function (evt) {
      evt.preventDefault();
    });
  };

  checkValidationInputAddress();

  var inputTitle = noticeForm.querySelector('#title');

  var checkValidationInputTitle = function () {
    inputTitle.required = 'required';
    inputTitle.minLength = '30';
    inputTitle.maxLength = '100';
  };

  checkValidationInputTitle();

  var inputPrice = noticeForm.querySelector('#price');

  var checkValidationInputPrice = function () {
    inputPrice.required = 'required';
    inputPrice.value = '1000';
    inputPrice.min = '0';
    inputPrice.max = '1000000';
  };

  checkValidationInputPrice();

  var selectTimeIn = noticeForm.querySelector('#timein');
  var selectTimeOut = noticeForm.querySelector('#timeout');

  var syncValues = function (index, element, value) {
    element.value = value[index];
  };

  selectTimeIn.addEventListener('change', function () {
    window.synchronizeFields(selectTimeIn, selectTimeOut, VALUES_SELECT_TIME, VALUES_SELECT_TIME, syncValues);
  });

  selectTimeOut.addEventListener('change', function () {
    window.synchronizeFields(selectTimeOut, selectTimeIn, VALUES_SELECT_TIME, VALUES_SELECT_TIME, syncValues);
  });

  var selectType = noticeForm.querySelector('#type');

  var syncValueWithMin = function (index, element, value) {
    element.min = value[index];
  };

  window.synchronizeFields(selectType, inputPrice, VALUES_SELECT_TYPE, MIN_INPUT_PRICE, syncValueWithMin);

  selectType.addEventListener('change', function () {
    window.synchronizeFields(selectType, inputPrice, VALUES_SELECT_TYPE, MIN_INPUT_PRICE, syncValueWithMin);
  });

  var selectRoomNumber = noticeForm.querySelector('#room_number');
  var optionsRoomNumber = selectRoomNumber.querySelectorAll('option');
  var selectCapacity = noticeForm.querySelector('#capacity');
  var optionsCapacity = selectCapacity.querySelectorAll('option');

  var setCapacity = function () {
    Array.from(optionsCapacity).forEach(function (option) {
      option.disabled = false;
    });

    Array.from(optionsRoomNumber).forEach(function (option) {
      if (option.selected) {
        switch (option.value) {
          case '1':
            optionsCapacity[2].selected = true;
            optionsCapacity[0].disabled = true;
            optionsCapacity[1].disabled = true;
            optionsCapacity[3].disabled = true;
            break;
          case '2':
            optionsCapacity[1].selected = true;
            optionsCapacity[0].disabled = true;
            optionsCapacity[3].disabled = true;
            break;
          case '3':
            optionsCapacity[0].selected = true;
            optionsCapacity[3].disabled = true;
            break;
          case '100':
            optionsCapacity[3].selected = true;
            optionsCapacity[0].disabled = true;
            optionsCapacity[1].disabled = true;
            optionsCapacity[2].disabled = true;
            break;
        }
      }
    });
  };

  setCapacity();

  selectRoomNumber.addEventListener('change', function () {
    setCapacity();
  });

  noticeForm.action = 'https://js.dump.academy/keksobooking';

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    window.backend.save(new FormData(noticeForm), function () {
      noticeForm.reset();
      inputPrice.value = '1000';
      window.map.fillAddress();
      setCapacity();
    }, window.error);
  });
})();
