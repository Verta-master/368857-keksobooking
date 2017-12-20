'use strict';

// Отрисовка маркеров
(function () {
  var TICKETS_NUMBER = 5;
  var CHILDREN_NUMBER = 2;
  var PIN_WIDTH = 40;
  var PIN_HEIGHT = 40;
  var mapView = false;
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pins');
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

  // удаление узлов выполняется, ориентируясь на порядок размещения в верстке
  function removePin(parentNode) {
    while (parentNode.childElementCount > CHILDREN_NUMBER) {
      parentNode.removeChild(parentNode.lastChild);
    }
  }

  function drawPinsOnMap() {
    removePin(mapPin);
    mapPin.appendChild(fragment);
  }

  window.pin = {
    activate: function (mainPinNode, pinData) {
      function onMainPinMouseUp() {
        if (mapView === false) {
          map.classList.remove('map--faded');
          window.form.setActive();
          [].forEach.call(pinData.slice(0, TICKETS_NUMBER), addPinToFragment);
          mapPin.appendChild(fragment);
          mapView = true;
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
