'use strict';

(function () {
  var Limit = {
    X: {
      MIN: 300,
      MAX: 900
    },
    Y: {
      MIN: 100,
      MAX: 500
    }
  };
  var MAIN_PIN_HEIGHT = 65;
  var pinShift = window.shift.halfPin(MAIN_PIN_HEIGHT);
  var mainPin = document.querySelector('.map__pin--main');

  function onSuccessLoad(response) {
    window.card.render(window.pin.map);
    window.pin.activate(mainPin, response);
    window.pin.mapMarker.addEventListener('click', onPinClick);
    window.card.setHandlers();
    window.filtering.start(response);
  }

  window.backend.load(onSuccessLoad, window.backend.errorHandler);

  function onPinClick(evt) {
    var targetPin = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;
    if (targetPin.classList.contains('map__pin--main') === false && targetPin.classList.contains('map__pin')) {
      var pinNumber = parseInt(targetPin.getAttribute('data-number'), 10);
      window.pin.isActive(targetPin);
      targetPin.classList.add('map__pin--active');
      window.card.setData(window.filtering.loadedData[pinNumber]);
      window.card.show();
    }
  }

  // Начальное состояние
  window.pin.fadeMap();
  window.card.hide();
  window.form.setInitialState(mainPin.offsetLeft, mainPin.offsetTop, MAIN_PIN_HEIGHT);

  // Перемещение главного пина
  mainPin.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };
    var finalCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    function onMouseMove(moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      finalCoords.x = mainPin.offsetLeft - shift.x;
      var newY = mainPin.offsetTop - shift.y;
      if (newY < (Limit.Y.MIN - pinShift)) {
        finalCoords.y = Limit.Y.MIN - pinShift;
      } else if (newY > (Limit.Y.MAX - pinShift)) {
        finalCoords.y = Limit.Y.MAX - pinShift;
      } else {
        finalCoords.y = newY;
      }

      mainPin.style.top = finalCoords.y + 'px';
      mainPin.style.left = finalCoords.x + 'px';
      window.form.setAddress(finalCoords.x, finalCoords.y, MAIN_PIN_HEIGHT);
    }

    function onMouseUp(upEvt) {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
