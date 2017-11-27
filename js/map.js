'use strict';

var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var NUMBER_OF_RENTALS = 8;
var CARD_RENDER_NUMBER = 0;

var getRandomNumber = function (min, max) {
  return Math.floor(Math.random() * (max - min) + min);
};

var getRandomElement = function (arr) {
  return arr[getRandomNumber(0, arr.length)];
};

var getArrayRandomLength = function (arr) {
  var newArr = [];

  while (newArr.length < arr.length) {
    var randomElement = getRandomElement(arr);

    for (var i = 0; i < arr.length; i++) {
      if (newArr[i] === randomElement) {
        var check = false;
        break;
      } else {
        check = true;
      }
    }

    if (check === true) {
      newArr.push(randomElement);
    }
  }

  newArr = newArr.slice(0, getRandomNumber(0, newArr.length));
  return newArr;
};

var createOffer = function (addressAvatar, indexTitle) {
  var coordinatesLocation = [getRandomNumber(300, 901), getRandomNumber(100, 501)];
  var parameters = {
    'author': {
      'avatar': 'img/avatars/user0' + addressAvatar + '.png'
    },

    'offer': {
      'title': TITLES[indexTitle],
      'address': coordinatesLocation[0] + ', ' + coordinatesLocation[1],
      'price': getRandomNumber(1000, 1000001),
      'type': getRandomElement(OFFER_TYPES),
      'rooms': getRandomNumber(1, 6),
      'guests': getRandomNumber(1, 10),
      'checkin': getRandomElement(TIMES),
      'checkout': getRandomElement(TIMES),
      'features': getArrayRandomLength(FEATURES),
      'description': '',
      'photos': []
    },

    'location': {
      'x': coordinatesLocation[0],
      'y': coordinatesLocation[1]
    }
  };

  return parameters;
};

var addObjects = function (numberOfObjects) {
  var Objects = [];

  for (var i = 0; i < numberOfObjects; i++) {
    Objects.push(createOffer(i + 1, i));
  }

  return Objects;
};

var listOfRentals = addObjects(NUMBER_OF_RENTALS);

var map = document.querySelector('.map');
map.classList.remove('map--faded');

var mapListElement = map.querySelector('.map__pins');
var template = document.querySelector('template').content;

var renderMapPin = function (element) {
  var mapPin = template.querySelector('.map__pin').cloneNode(true);

  mapPin.style.left = element.location.x + 'px';
  mapPin.style.top = element.location.y + 'px';
  mapPin.querySelector('img').setAttribute('src', element.author.avatar);

  return mapPin;
};

var renderMapCard = function (element) {
  var mapCard = template.querySelector('.map__card').cloneNode(true);

  var getValueTypeOffer = function () {
    if (element.offer.type === 'flat') {
      return 'Квартира';
    } else if (element.offer.type === 'bungalo') {
      return 'Бунгало';
    } else {
      return 'Дом';
    }
  };

  mapCard.querySelector('h3').textContent = element.offer.title;
  mapCard.querySelector('small').textContent = element.offer.address;
  mapCard.querySelector('.popup__price').innerHTML = element.offer.price + ' &#x20bd;/ночь';
  mapCard.querySelector('h4').textContent = getValueTypeOffer();
  mapCard.querySelector('h4').nextElementSibling.textContent = element.offer.rooms + ' для ' + element.offer.guests + ' гостей';
  mapCard.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + element.offer.checkin + ', выезд до ' + element.offer.checkout;

  for (var i = 0; i < FEATURES.length; i++) {
    var feature = mapCard.querySelector('.feature--' + FEATURES[i]);

    for (var j = 0; j < element.offer.features.length; j++) {
      if (FEATURES[i] === element.offer.features[j]) {
        var check = false;
        break;
      } else {
        check = true;
      }
    }

    if (check === true) {
      mapCard.querySelector('.popup__features').removeChild(feature);
    }
  }

  mapCard.querySelector('.popup__features').nextElementSibling.textContent = element.offer.description;
  mapCard.querySelector('.popup__avatar').setAttribute('src', element.author.avatar);

  return mapCard;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < listOfRentals.length; i++) {
  fragment.appendChild(renderMapPin(listOfRentals[i]));
}

fragment.appendChild(renderMapCard(listOfRentals[CARD_RENDER_NUMBER]));

mapListElement.appendChild(fragment);
