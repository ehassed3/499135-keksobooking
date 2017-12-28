'use strict';

(function () {
  var preview = document.querySelector('.form__photo-container');
  var fileChooser = preview.querySelector('input[type=file]');

  window.loadPhoto(fileChooser, function (result) {
    var previewPhoto = document.createElement('img');
    previewPhoto.src = result;
    previewPhoto.style = 'max-width: 140px; margin-top: 10px;';
    preview.appendChild(previewPhoto);
  });
})();
