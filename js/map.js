'use strict';

(function () {
  var CARD_RENDER_NUMBER = 0;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

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

  var openPage = function () {
    map.classList.remove('map--faded');

    for (var i = 0; i < mapPinsSide.length; i++) {
      mapPinsSide[i].classList.remove('hidden');
    }

    noticeForm.classList.remove('notice__form--disabled');
    window.form.disableFieldset(noticeFields, false);
  };

  var inputAddress = noticeForm.querySelector('#address');

  var getAddressGeneralPin = function () {
    inputAddress.value = 'mock address';
  };

  mapPinMain.addEventListener('mouseup', function () {
    openPage();
    getAddressGeneralPin();
  });

  mapPinMain.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPage();
    }
  });

  var replacePopup = function (target) {
    for (var i = 0; i < window.data.listOfRentals.length; i++) {
      if (target.firstChild.getAttribute('src') === window.data.listOfRentals[i].author.avatar) {
        window.card.renderPopup(popup, window.data.listOfRentals[i]);
      }
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      closePopup(evt);
    }
  };

  var openPopup = function (evt) {
    var target = evt.target;

    while (target !== mapListElement) {
      if (target.className === 'map__pin') {
        for (var i = 0; i < mapPinsSide.length; i++) {
          mapPinsSide[i].classList.remove('map__pin--active');
        }

        target.classList.add('map__pin--active');
        popup.classList.remove('hidden');

        replacePopup(target);

        document.addEventListener('keydown', onPopupEscPress);

        break;
      }

      target = target.parentNode;
    }
  };

  var popupClosingElement = popup.querySelector('.popup__close');

  var closePopup = function () {
    popup.classList.add('hidden');
    for (var i = 0; i < mapPinsSide.length; i++) {
      mapPinsSide[i].classList.remove('map__pin--active');
    }
  };

  mapListElement.addEventListener('click', function (evt) {
    openPopup(evt);
  });

  mapListElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      openPopup(evt);
    }
  });

  popupClosingElement.addEventListener('click', function (evt) {
    closePopup(evt);
  });

  popupClosingElement.addEventListener('keydown', function (evt) {
    if (evt.keyCode === ENTER_KEYCODE) {
      closePopup(evt);
    }
  });
})();
