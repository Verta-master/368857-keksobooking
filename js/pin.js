'use strict';

// Отрисовка маркеров
(function () {
  var TICKETS_NUMBER = 5;
  var pinWidth = 40;
  var pinHeight = 40;
  var startMap = false;
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();

  function addPinToFragment(ticket, ticketNumber) {
    var newPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
    newPin.querySelector('img').src = ticket.author.avatar;
    newPin.querySelector('img').width = pinWidth;
    newPin.querySelector('img').height = pinHeight;
    newPin.style.left = ticket.location.x + 'px';
    newPin.style.top = window.shift.getPinShiftY(ticket.location.y, pinHeight) + 'px';
    newPin.setAttribute('data-number', String(ticketNumber));
    fragment.appendChild(newPin);
  }

  function removePin(parentNode) {
    while (parentNode.childElementCount > 2) {
      parentNode.removeChild(parentNode.lastChild);
    }
  }

  function drawPinsOnMap() {
    removePin(mapPin);
    mapPin.appendChild(fragment);
  }

  window.pin = {
    activateMainPin: function (mainPinNode, pinData) {
      function onMainPinMouseUp() {
        if (startMap === false) {
          map.classList.remove('map--faded');
          window.form.setActive();
          window.form.setFieldsActive();
          [].forEach.call(pinData.slice(0, TICKETS_NUMBER), addPinToFragment);
          mapPin.appendChild(fragment);
          startMap = true;
        }
      }
      mainPinNode.addEventListener('mouseup', onMainPinMouseUp);
    },
    activatedPin: false,
    isActive: function (pin) {
      if (this.activatedPin === false) {
        pin.classList.add('map__pin--active');
      } else {
        this.activatedPin.classList.remove('map__pin--active');
        pin.classList.add('map__pin--active');
      }
      this.activatedPin = pin;
    },
    fadeMap: function () {
      if (map.classList.contains('map--faded') === false) {
        map.classList.add('map--faded');
      }
    },
    map: map,
    mapMarker: mapPin,
    showFiteredArray: function (customArray) {
      var filteredPins = customArray.slice(0, TICKETS_NUMBER);
      [].forEach.call(filteredPins, addPinToFragment);
      window.debounce(drawPinsOnMap);
    },
  };
})();
