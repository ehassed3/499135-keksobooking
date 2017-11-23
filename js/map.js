'use strict';

var USER_ADDRESS_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var TIMES = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

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
  arr.length = getRandomIndexElement(arr);
  return arr;
};

var getRandomLocation = function (minX, maxX, minY, maxY) {
  var coordinates = [];

  for (var i = 0; i < 8; i++) {
    coordinates.push([getRandomNumber(minX, maxX), getRandomNumber(minY, maxY)]);
  }

  return coordinates;
};

var coordinatesLocation = getRandomLocation(300, 901, 100, 501);

var addObjects = function (numberOfObjects) {
  var massive = [];

  for (var i = 0; i < numberOfObjects; i++) {
    massive.push({
      'author': {
        'avatar': 'img/avatars/user' + getNumberAddressAvatar(USER_ADDRESS_NUMBERS)
      },

      'offer': {
        'title': getRandomTitleOffer(TITLES),
        'address': coordinatesLocation[i][0] + ', ' + coordinatesLocation[i][1],
        'price': getRandomNumber(1000, 1000001),
        'type': getRandomElement(OFFER_TYPES),
        'rooms': getRandomNumber(1, 6),
        'guests': getRandomNumber(1, 20),
        'checkin': getRandomElement(TIMES),
        'checkout': getRandomElement(TIMES),
        'features': getArrayRandomLength(FEATURES),
        'description': '',
        'photos': []
      },

      'location': {
        'x': coordinatesLocation[i][0],
        'y': coordinatesLocation[i][1]
      }});
  }

  return massive;
};

var ads = addObjects(8);
