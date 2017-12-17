'use strict';

(function () {
  var succesHandler = function (data) {
    window.data = data;
  };

  var errorHandler = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; width: 100%; z-index: 100; font-size: 50px; text-align: center; color: red;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };

  window.backend.load(succesHandler, errorHandler);
})();
