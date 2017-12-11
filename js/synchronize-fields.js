'use strict';

(function () {
  window.synchronizeFields = function (element1, element2, values1, values2, callback) {
    for (var i = 0; i < values1.length; i++) {
      if (element1.value === values1[i]) {
        callback(element2, values2[i]);
      }
    }
  };
})();
