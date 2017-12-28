'use strict';

(function () {
  var addElementsPopup = function (parent, element) {
    var typesOffer = {
      'flat': 'Квартира',

      'bungalo': 'Бунгало',

      'house': 'Дом'
    };

    var removeChilds = function (topElement) {
      while (topElement.firstChild) {
        topElement.removeChild(topElement.firstChild);
      }
    };

    parent.querySelector('h3').textContent = element.offer.title;
    parent.querySelector('small').textContent = element.offer.address;
    parent.querySelector('.popup__price').innerHTML = element.offer.price + ' &#x20bd;/ночь';
    parent.querySelector('h4').textContent = typesOffer[element.offer.type];
    parent.querySelector('h4').nextElementSibling.textContent = element.offer.rooms + ' для ' + element.offer.guests + ' гостей';
    parent.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

    var featuresList = parent.querySelector('.popup__features');
    removeChilds(featuresList);

    var fragmentFeatures = document.createDocumentFragment();

    element.offer.features.forEach(function (feature) {
      var featureElement = document.createElement('li');
      featureElement.classList.add('feature', 'feature--' + feature);
      fragmentFeatures.appendChild(featureElement);
    });

    featuresList.appendChild(fragmentFeatures);

    var photosList = parent.querySelector('.popup__pictures');
    removeChilds(photosList);

    var fragmentPhotos = document.createDocumentFragment();

    element.offer.photos.forEach(function (source) {
      var photosElement = document.createElement('li');
      var photo = document.createElement('img');
      photo.src = source;
      photo.style = 'width: 40px; height: 40px;';
      photosElement.appendChild(photo);
      fragmentPhotos.appendChild(photosElement);
    });

    photosList.appendChild(fragmentPhotos);

    parent.querySelector('.popup__features').nextElementSibling.textContent = element.offer.description;
    parent.querySelector('.popup__avatar').src = element.author.avatar;
  };

  window.card = function (element) {
    var template = document.querySelector('template').content;
    var mapCard = template.querySelector('.map__card').cloneNode(true);

    addElementsPopup(mapCard, element);

    return mapCard;
  };
})();
