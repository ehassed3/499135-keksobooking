'use strict';

(function () {
  var TAB_KEYCODE = 9;

  var noticeForm = document.querySelector('.notice__form');
  var noticeFields = noticeForm.querySelectorAll('fieldset');

  window.form = {
    disableFieldset: function (elementsForm, disabled) {
      for (var i = 0; i < elementsForm.length; i++) {
        elementsForm[i].disabled = disabled;
      }
    }
  };

  window.form.disableFieldset(noticeFields, true);

  var inputAddress = noticeForm.querySelector('#address');

  var checkValidationInputAddress = function () {
    inputAddress.setAttribute('required', 'required');
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
    inputTitle.setAttribute('required', 'required');
    inputTitle.setAttribute('minlength', '30');
    inputTitle.setAttribute('maxlength', '100');
  };

  checkValidationInputTitle();

  var inputPrice = noticeForm.querySelector('#price');

  var checkValidationInputPrice = function () {
    inputPrice.setAttribute('required', 'required');
    inputPrice.setAttribute('value', '1000');
    inputPrice.setAttribute('min', '0');
    inputPrice.setAttribute('max', '1000000');
  };

  checkValidationInputPrice();

  var selectTimeIn = noticeForm.querySelector('#timein');
  var selectTimeOut = noticeForm.querySelector('#timeout');

  var selectTimeInChangeHandler = function () {
    selectTimeOut.selectedIndex = selectTimeIn.selectedIndex;
  };

  var selectTimeOutChangeHandler = function () {
    selectTimeIn.selectedIndex = selectTimeOut.selectedIndex;
  };

  selectTimeIn.addEventListener('change', selectTimeInChangeHandler);
  selectTimeOut.addEventListener('change', selectTimeOutChangeHandler);

  var selectType = noticeForm.querySelector('#type');
  var optionsType = selectType.querySelectorAll('option');

  var setMinValue = function () {
    for (var i = 0; i < optionsType.length; i++) {
      if (optionsType[i].selected === true) {
        switch (optionsType[i].value) {
          case 'bungalo':
            inputPrice.min = 0;
            break;
          case 'flat':
            inputPrice.min = 1000;
            break;
          case 'house':
            inputPrice.min = 5000;
            break;
          case 'palace':
            inputPrice.min = 10000;
            break;
        }
      }
    }
  };

  setMinValue();

  selectType.addEventListener('change', function () {
    setMinValue();
  });

  var selectRoomNumber = noticeForm.querySelector('#room_number');
  var optionsRoomNumber = selectRoomNumber.querySelectorAll('option');
  var selectCapacity = noticeForm.querySelector('#capacity');
  var optionsCapacity = selectCapacity.querySelectorAll('option');

  var setCapacity = function () {
    for (var i = 0; i < optionsCapacity.length; i++) {
      optionsCapacity[i].disabled = false;
    }

    for (var j = 0; j < optionsRoomNumber.length; j++) {

      if (optionsRoomNumber[j].selected === true) {
        switch (optionsRoomNumber[j].value) {
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
    }
  };

  setCapacity();

  selectRoomNumber.addEventListener('change', function () {
    setCapacity();
  });

  noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
})();
