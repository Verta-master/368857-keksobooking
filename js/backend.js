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
      var message = document.createElement('div');
      message.style.zIndex = '100';
      message.style.position = 'absolute';
      message.style.top = '50%';
      message.style.left = '50%';
      message.style.transform = 'translate(-50%, -50%)';
      message.style.padding = '10px';
      message.fontSize = '30px';
      message.style.color = 'red';
      message.style.border = '1px solid red';
      message.style.backgroundColor = '#ffffff';
      message.textContent = errorMessage;
      document.body.insertAdjacentElement('afterbegin', message);
    }
  };
})();
