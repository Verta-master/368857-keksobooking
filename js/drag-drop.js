'use strict';

// работа с формой
(function () {
  var dropZones = document.querySelectorAll('.drop-zone');
  var avatarDropZone = dropZones[0];
  var imageDropZone = dropZones[1];
  var avatarImage = document.querySelector('.notice__preview img');
  var uploadImageArea = document.querySelector('.form__photo-container');

  avatarDropZone.addEventListener('dragenter', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });

  avatarDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });

  avatarDropZone.addEventListener('drop', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    var files = evt.dataTransfer.files;
    avatarImage.src = 'img/' + files[0].name;
  });

  imageDropZone.addEventListener('dragenter', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });

  imageDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });

  imageDropZone.addEventListener('drop', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    var files = evt.dataTransfer.files;
    for (var i = 0; i < files.length; i++) {
      var img = document.createElement('img');
      img.scr = 'img/' + files[i].name;
      uploadImageArea.insertAdjacentHTML('beforeend', img);
    }
  });
})();
