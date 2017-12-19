'use strict';

(function () {
  var Server = {
    URL: 'https://1510.dump.academy/keksobooking',
    STATUS_OK: 200,
    TIMEOUT: 10000,
  };

  function setup(onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === Server.STATUS_OK) {
        onLoad(xhr.response);
      } else {
        onError(xhr.response);
      }
    });
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onError('Запрос не успел выполниться за ' + xhr.timeout + 'мс');
    });

    xhr.timeout = Server.TIMEOUT;
    return xhr;
  }

  window.backend = {
    save: function (data, onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('POST', Server.URL);
      xhr.send(data);
    },
    load: function (onLoad, onError) {
      var xhr = setup(onLoad, onError);

      xhr.open('GET', Server.URL + '/data');
      xhr.send();
    },
    errorHandler: function (errorMessage) {
      var message = document.querySelector('.error-message');
      message.textContent = errorMessage;
      message.classList.remove('hidden');
    },
  };
})();
