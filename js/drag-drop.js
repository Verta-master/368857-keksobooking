'use strict';

// Загрузка картинок
(function () {
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarDropZone = document.querySelector('.notice__photo .drop-zone');
  var imageDropZone = document.querySelector('.form__photo-container .drop-zone');
  var avatarImage = document.querySelector('.notice__preview img');
  var uploadImageArea = document.querySelector('.form__photo-container');
  var avatarFile = document.querySelector('#avatar');
  var imageFile = document.querySelector('#images');
  imageFile.setAttribute('multiple', true);

  // Загрузка через input[type=file]
  avatarFile.addEventListener('change', function () {
    var file = avatarFile.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (item) {
      return fileName.endsWith(item);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarImage.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  imageFile.addEventListener('change', function () {
    for (var i = 0; i < imageFile.files.length; i++) {
      var file = imageFile.files[i];
      var fileNames = file.name.toLowerCase();

      var matches = FILE_TYPES.some(function (item) {
        return fileNames.endsWith(item);
      });

      if (matches) {
        var reader = new FileReader();

        reader.addEventListener('load', function () {
          var img = document.createElement('IMG');
          img.width = '40';
          uploadImageArea.appendChild(img);
          img.src = reader.result;
        });
        reader.readAsDataURL(file);
      }
    }
  });

  // Загрузка drag-and-drop
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
    for (var j = 0; j < evt.dataTransfer.files.length; j++) {
      var file = evt.dataTransfer.files[j];
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        var img = document.createElement('IMG');
        img.width = '40';
        uploadImageArea.appendChild(img);
        img.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });
})();
