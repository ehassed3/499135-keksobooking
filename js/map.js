'use strict';

(function () {
  var CARD_RENDER_NUMBER = 0;
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;
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

  var replacePopup = function (target) {
    for (var i = 0; i < window.data.listOfRentals.length; i++) {
      if (target.firstChild.getAttribute('src') === window.data.listOfRentals[i].author.avatar) {
        window.card.renderPopup(popup, window.data.listOfRentals[i]);
      }
    }
  };

  var onPopupEscPress = function (evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      window.map.closePopup(evt);
    }
  };

  window.map = {
    openPage: function () {
      map.classList.remove('map--faded');

      for (var i = 0; i < mapPinsSide.length; i++) {
        mapPinsSide[i].classList.remove('hidden');
      }

      noticeForm.classList.remove('notice__form--disabled');
      window.form.disableFieldset(noticeFields, false);
    },

    openPopup: function (evt) {
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

      var popupClosingElement = popup.querySelector('.popup__close');

      popupClosingElement.addEventListener('click', function () {
        window.map.closePopup();
      });

      popupClosingElement.addEventListener('keydown', function () {
        if (evt.keyCode === ENTER_KEYCODE) {
          window.map.closePopup(evt);
        }
      });
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

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      var pinMainImage = mapPinMain.querySelector('img');

      var coordinate = {
        x: moveEvt.clientX - parseInt(getComputedStyle(document.body).marginLeft, 0),
        y: moveEvt.clientY - (pinMainImage.height / 2 + PIN_MAIN_SPIRE_HEIGHT)
      };

      mapPinMain.style.top = coordinate.y + 'px';
      mapPinMain.style.left = coordinate.x + 'px';

      if (coordinate.y < 100) {
        mapPinMain.style.top = '100px';
      } else if (coordinate.y > 500) {
        mapPinMain.style.top = '500px';
      }

      var inputAddress = noticeForm.querySelector('#address');
      inputAddress.value = 'x: ' + mapPinMain.style.left + ', y: ' + mapPinMain.style.top;
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
