'use strict';

(function () {
  window.card = {
    renderPopup: function (parent, element) {
      var getValueTypeOffer = function () {
        if (element.offer.type === 'flat') {
          return 'Квартира';
        } else if (element.offer.type === 'bungalo') {
          return 'Бунгало';
        } else {
          return 'Дом';
        }
      };

      var removeChilds = function (topElement) {
        while (topElement.firstChild) {
          topElement.removeChild(topElement.firstChild);
        }
      };

      parent.querySelector('h3').textContent = element.offer.title;
      parent.querySelector('small').textContent = element.offer.address;
      parent.querySelector('.popup__price').innerHTML = element.offer.price + ' &#x20bd;/ночь';
      parent.querySelector('h4').textContent = getValueTypeOffer();
      parent.querySelector('h4').nextElementSibling.textContent = element.offer.rooms + ' для ' + element.offer.guests + ' гостей';
      parent.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

      var featuresList = parent.querySelector('.popup__features');
      removeChilds(featuresList);

      var fragmentFeatures = document.createDocumentFragment();

      for (var i = 0; i < element.offer.features.length; i++) {
        var featureElement = document.createElement('li');
        featureElement.classList.add('feature', 'feature--' + element.offer.features[i]);
        fragmentFeatures.appendChild(featureElement);
      }

      featuresList.appendChild(fragmentFeatures);

      parent.querySelector('.popup__features').nextElementSibling.textContent = element.offer.description;
      parent.querySelector('.popup__avatar').setAttribute('src', element.author.avatar);
    },

    renderMapCard: function (element) {
      var template = document.querySelector('template').content;
      var mapCard = template.querySelector('.map__card').cloneNode(true);

      window.card.renderPopup(mapCard, element);

      return mapCard;
    }
  };
})();
