'use strict';

(function () {
  var CARD_RENDER_NUMBER = 0;

  var map = document.querySelector('.map');
  var mapListElement = map.querySelector('.map__pins');

  var successHandler = function (listOfRentals) {
    var fragment = document.createDocumentFragment();

    for (var i = 0; i < listOfRentals.length; i++) {
      fragment.appendChild(window.pin.renderMapPin(listOfRentals[i]));
    }

    fragment.appendChild(window.card.renderMapCard(listOfRentals[CARD_RENDER_NUMBER]));

    mapListElement.appendChild(fragment);

    var popup = mapListElement.querySelector('.popup');
    var mapPinMain = map.querySelector('.map__pin--main');
    mapListElement.insertBefore(popup, mapPinMain);
    popup.classList.add('hidden');
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; width: 100%; z-index: 100; font-size: 50px; text-align: center; color: red;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(successHandler, errorHandler);
})();
