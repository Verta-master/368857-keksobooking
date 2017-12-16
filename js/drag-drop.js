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
    var file = evt.dataTransfer.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      avatarImage.src = reader.result;
    });

    reader.readAsDataURL(file);
  });

  imageDropZone.addEventListener('dragenter', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
  });

  imageDropZone.addEventListener('dragover', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    return false;
  });

  imageDropZone.addEventListener('drop', function (evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
    var file = evt.dataTransfer.files[0];
    var reader = new FileReader();

    reader.addEventListener('load', function () {
      var img = document.createElement('IMG');
      img.width = '100';
      uploadImageArea.appendChild(img);
      img.src = reader.result;
      img.setAttribute('draggable', true);
    });

    reader.readAsDataURL(file);
  });

  imageDropZone.addEventListener('dragstart', function (evt) {
    if (evt.target.tagName.toLowerCase() === 'img') {
      // var draggedItem = evt.target;
      evt.dataTransfer.setData('text/plain', evt.target.alt);
    }
  });

})();
