'use strict';

(function () {
  window.synchronizeFields = function (element1, element2, values1, values2, callback) {
    callback(values1.indexOf(element1.value), element2, values2);
  };
})();
