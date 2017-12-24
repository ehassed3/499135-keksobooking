'use strict';

(function () {
  window.error = function (errorMessage) {
    var node = document.createElement('div');
    node.style = 'position: absolute; z-index: 100; font-size: 30px; text-align: center; color: red; background-color: black; opacity: 0.8; left: 0; right: 0;';
    node.textContent = errorMessage;
    document.body.insertAdjacentElement('afterbegin', node);
  };
})();
