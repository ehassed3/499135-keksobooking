'use strict';

(function () {
  var TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var TIMES = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var NUMBER_OF_RENTALS = 8;

  var getRandomNumber = function (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  };

  var getRandomElement = function (arr) {
    return arr[getRandomNumber(0, arr.length)];
  };

  var getRandomArray = function (arr) {
    var newArr = [];

    while (newArr.length < arr.length) {
      var randomElement = getRandomElement(arr);

      if (newArr.indexOf(randomElement) !== -1) {
        continue;
      }

      newArr.push(randomElement);
    }

    newArr = newArr.slice(0, getRandomNumber(0, newArr.length));
    return newArr;
  };

  var createOffer = function (indexOffer) {
    var coordinatesLocation = [getRandomNumber(300, 901), getRandomNumber(100, 501)];
    return {
      'author': {
        'avatar': 'img/avatars/user0' + (indexOffer + 1) + '.png'
      },

      'offer': {
        'title': TITLES[indexOffer],
        'address': coordinatesLocation[0] + ', ' + coordinatesLocation[1],
        'price': getRandomNumber(1000, 1000001),
        'type': getRandomElement(OFFER_TYPES),
        'rooms': getRandomNumber(1, 6),
        'guests': getRandomNumber(1, 10),
        'checkin': getRandomElement(TIMES),
        'checkout': getRandomElement(TIMES),
        'features': getRandomArray(FEATURES),
        'description': '',
        'photos': []
      },

      'location': {
        'x': coordinatesLocation[0],
        'y': coordinatesLocation[1]
      }
    };
  };

  var addObjects = function (numberOfObjects) {
    var Objects = [];

    for (var i = 0; i < numberOfObjects; i++) {
      Objects.push(createOffer(i));
    }

    return Objects;
  };

  window.data = {
    listOfRentals: addObjects(NUMBER_OF_RENTALS)
  };
})();
