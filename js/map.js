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
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var pinShift = window.shift.halfPin(MAIN_PIN_HEIGHT);
  var mainPin = document.querySelector('.map__pin--main');
  var map = document.querySelector('.map');
  var fragment = document.createDocumentFragment();

  function addPinToFragment(ticket, ticketNumber) {
    var newPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
    newPin.querySelector('img').src = ticket.author.avatar;
    newPin.querySelector('img').width = PIN_WIDTH;
    newPin.querySelector('img').height = PIN_HEIGHT;
    newPin.style.left = ticket.location.x + 'px';
    newPin.style.top = window.shift.getPinY(ticket.location.y, PIN_HEIGHT) + 'px';
    newPin.setAttribute('data-number', String(ticketNumber));
    fragment.appendChild(newPin);
  }

  function showError() {
    var message = document.createElement('div');
    message.style = 'z-index: 100; position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); padding: 0 30px; text-align: center; font-size: 30px; color: red; border: 1px solid red; background-color: #ffffff';
    message.classList.add('error-message');
    message.classList.add('hidden');
    document.body.insertAdjacentElement('afterbegin', message);
  }

  function onSuccessLoad(response) {
    var message = document.querySelector('.error-message');
    if (message.classList.contains('hidden') === false) {
      message.classList.add('hidden');
    };
    map.classList.remove('map--faded');
    window.form.setActive();
    window.form.setFieldsActive();
    [].forEach.call(response.slice(0, window.pin.TICKETS_NUMBER), addPinToFragment);
    window.pin.mapMarker.appendChild(fragment);
    window.card.render(map);
    window.pin.mapMarker.addEventListener('click', onPinClick);
    window.card.setHandlers();
    window.filtering.startFilters(response);
  }

  window.pin.activateMainPin(mainPin, onSuccessLoad);

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

  function fadeMap() {
    if (map.classList.contains('map--faded') === false) {
      map.classList.add('map--faded');
    }
  }

  // Начальное состояние
  fadeMap();
  showError();
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
