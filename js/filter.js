'use strict';

(function () {
  var NUMBER_PINS = 5;
  var PRICE_MIDDLE_MIN = 10000;
  var PRICE_MIDDLE_MAX = 50000;

  var priceOptions = {
    'low': function (price) {
      return price < PRICE_MIDDLE_MIN;
    },
    'middle': function (price) {
      return price >= PRICE_MIDDLE_MIN && price <= PRICE_MIDDLE_MAX;
    },
    'high': function (price) {
      return price > PRICE_MIDDLE_MAX;
    }
  };

  var filterPrice = function (list, value) {
    return list.filter(function (element) {
      return priceOptions[value](element.offer.price);
    });
  };

  var filterValue = function (list, value, type) {
    return list.filter(function (element) {
      if (type === 'guests') {
        return element.offer[type] >= parseInt(value, 0);
      } else {
        return element.offer[type].toString() === value;
      }
    });
  };

  var filterFeatures = function (list, feature) {
    return list.filter(function (element) {
      return element.offer.features.indexOf(feature) !== -1;
    });
  };

  var filters = document.querySelector('.map__filters');

  var getFilteredData = function (defaultArray) {
    var checkFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    var filtersSelects = filters.querySelectorAll('select');

    var newArray = defaultArray.slice();

    Array.from(filtersSelects).filter(function (element) {
      return element.value !== 'any';
    }).forEach(function (element) {
      var type = element.name.split('-')[1];
      newArray = (type === 'price') ? filterPrice(newArray, element.value) : filterValue(newArray, element.value, type);
    });

    checkFeatures.forEach(function (element) {
      newArray = filterFeatures(newArray, element.value);
    });

    return newArray;
  };

  window.filter = function (data) {
    var filteredData = getFilteredData(data);

    window.pin.removeMapPin();

    filteredData.length = Math.min(filteredData.length, NUMBER_PINS);
    window.pin.addMapPin(filteredData, filteredData.length);

    window.pin.pressPinSide();
  };
})();
