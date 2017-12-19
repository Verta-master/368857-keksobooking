'use strict';

// Отрисовка маркеров
(function () {
  var TICKETS_NUMBER = 5;
  var mapView = false;
  var mapPin = document.querySelector('.map__pins');

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
    activateMainPin: function (mainPinNode, successLoadCb) {
      function onMainPinMouseUp() {
        if (mapView === false) {
          window.backend.load(successLoadCb, window.backend.errorHandler);
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
    mapMarker: mapPin,
    showFiteredArray: function (customArray) {
      var filteredPins = customArray.slice(0, TICKETS_NUMBER);
      [].forEach.call(filteredPins, addPinToFragment);
      window.debounce(drawPinsOnMap);
    },
    TICKETS_NUMBER: TICKETS_NUMBER,
  };
})();
