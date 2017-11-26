'use strict';

var USER_ADDRESS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
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
  return arr[Math.floor(Math.random() * arr.length)];
};

var getRandomIndexElement = function (arr) {
  return Math.floor(Math.random() * arr.length);
};

var getNumberAddressAvatar = function (arrNumbers) {
  return '0' + arrNumbers.splice(0, 1)[0];
};

var getRandomTitleOffer = function (arrTitles) {
  return arrTitles.splice(getRandomIndexElement(arrTitles), 1)[0];
};

var getArrayRandomLength = function (arr) {
  var newArr = arr.slice(0, getRandomIndexElement(arr));
  return newArr;
};

var createOffer = function () {
  var coordinatesLocation = [getRandomNumber(300, 901), getRandomNumber(100, 501)];
  var parameters = {
    'author': {
      'avatar': 'img/avatars/user' + getNumberAddressAvatar(USER_ADDRESS_NUMBERS) + '.png'
    },

    'offer': {
      'title': getRandomTitleOffer(TITLES),
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
    Objects.push(createOffer());
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

var renderMapCard = function (numberElement) {
  var mapCard = template.querySelector('.map__card').cloneNode(true);

  var getValueTypeOffer = function () {
    if (listOfRentals[numberElement].offer.type === 'flat') {
      return 'Квартира';
    } else if (listOfRentals[numberElement].offer.type === 'bungalo') {
      return 'Бунгало';
    } else {
      return 'Дом';
    }
  };

  mapCard.querySelector('h3').textContent = listOfRentals[numberElement].offer.title;
  mapCard.querySelector('small').textContent = listOfRentals[numberElement].offer.address;
  mapCard.querySelector('.popup__price').innerHTML = listOfRentals[numberElement].offer.price + ' &#x20bd;/ночь';
  mapCard.querySelector('h4').textContent = getValueTypeOffer();
  mapCard.querySelector('h4').nextElementSibling.textContent = listOfRentals[numberElement].offer.rooms + ' для ' + listOfRentals[numberElement].offer.guests + ' гостей';
  mapCard.querySelector('.popup__features').previousElementSibling.textContent = 'Заезд после ' + listOfRentals[numberElement].offer.checkin + ', выезд до ' + listOfRentals[numberElement].offer.checkout;

  for (var i = FEATURES.length - 1; i > listOfRentals[numberElement].offer.features.length - 1; i--) {
    var feature = mapCard.querySelector('.feature--' + FEATURES[i]);
    mapCard.querySelector('.popup__features').removeChild(feature);
  }

  mapCard.querySelector('.popup__features').nextElementSibling.textContent = listOfRentals[numberElement].offer.description;
  mapCard.querySelector('.popup__avatar').setAttribute('src', listOfRentals[numberElement].author.avatar);

  return mapCard;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < listOfRentals.length; i++) {
  fragment.appendChild(renderMapPin(listOfRentals[i]));
}

fragment.appendChild(renderMapCard(CARD_RENDER_NUMBER));

mapListElement.appendChild(fragment);
