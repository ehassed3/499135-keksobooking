'use strict';

(function () {
  var PRICE_MIDDLE_MIN = 10000;
  var PRICE_MIDDLE_MAX = 50000;

  var getPriceOptions = function (price) {
    if (price < PRICE_MIDDLE_MIN) {
      return 'low';
    } else if (price >= PRICE_MIDDLE_MAX) {
      return 'high';
    } else {
      return 'middle';
    }
  };

  var filterPrice = function (elementPrice, filtersPrice) {
    return filtersPrice === 'any' || filtersPrice === getPriceOptions(elementPrice);
  };

  var filterValue = function (elementValue, filtersValue) {
    return filtersValue === 'any' || filtersValue === elementValue.toString();
  };

  var filterGuests = function (elementValue, filtersValue) {
    return filtersValue === 'any' || filtersValue <= elementValue;
  };

  var filterFeatures = function (elementFeatures, filtersFeatures) {
    return filtersFeatures.every(function (feature) {
      return elementFeatures.indexOf(feature) > -1;
    });
  };

  var filters = document.querySelector('.map__filters');

  var getFilteredData = function (defaultArray) {
    var checkFeatures = document.querySelectorAll('.map__filter-set input[type="checkbox"]:checked');
    var filtersSelects = filters.querySelectorAll('select');

    var filterElements = {
      features: []
    };

    Array.from(filtersSelects).forEach(function (element) {
      filterElements[element.name.split('-')[1]] = element.value;
    });

    checkFeatures.forEach(function (element) {
      filterElements.features.push(element.value);
    });

    var newArray = defaultArray.slice();

    return newArray.filter(function (element) {
      return filterValue(element.offer.type, filterElements.type) &&
        filterValue(element.offer.rooms, filterElements.rooms) &&
        filterGuests(element.offer.guests, filterElements.guests) &&
        filterPrice(element.offer.price, filterElements.price) &&
        filterFeatures(element.offer.features, filterElements.features);
    });
  };

  window.filter = function (data) {
    window.pin.remove();
    window.pin.add(getFilteredData(data));

    window.pin.pressPinSide();
  };
})();
