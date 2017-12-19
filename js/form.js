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

  var syncValues = function (element, value) {
    element.value = value;
  };

  selectTimeIn.addEventListener('change', function () {
    window.synchronizeFields(selectTimeIn, selectTimeOut, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  });

  selectTimeOut.addEventListener('change', function () {
    window.synchronizeFields(selectTimeOut, selectTimeIn, ['12:00', '13:00', '14:00'], ['12:00', '13:00', '14:00'], syncValues);
  });


  var selectType = noticeForm.querySelector('#type');

  var syncValueWithMin = function (element, value) {
    element.min = value;
  };

  window.synchronizeFields(selectType, inputPrice, ['flat', 'bungalo', 'house', 'palace'], [1000, 0, 5000, 10000], syncValueWithMin);

  selectType.addEventListener('change', function () {
    window.synchronizeFields(selectType, inputPrice, ['flat', 'bungalo', 'house', 'palace'], [1000, 0, 5000, 10000], syncValueWithMin);
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

  noticeForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    var errorHandler = function (errorMessage) {
      var node = document.createElement('div');
      node.style = 'position: absolute; z-index: 100; font-size: 30px; text-align: center; color: red; background-color: black; opacity: 0.8; width: 1200px;';
      node.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', node);
    };

    window.backend.save(new FormData(noticeForm), function () {
      noticeForm.reset();
    }, errorHandler);
  });
})();
