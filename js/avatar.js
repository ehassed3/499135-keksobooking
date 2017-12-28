'use strict';

(function () {
  var preview = document.querySelector('.notice__preview img');
  var fileChooser = document.querySelector('.notice__photo input[type=file]');

  window.loadPhoto(fileChooser, function (result) {
    preview.src = result;
  });
})();
