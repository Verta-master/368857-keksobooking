'use strict';

(function () {
  var mainPinHeight = 65;
  var pinShift = window.shift.halfPin(mainPinHeight);
  var mainPin = document.querySelector('.map__pin--main');

  function onSuccessLoad(response) {
    window.data.tickets = response.slice();
    window.card.render(window.pin.map);
    mainPin.addEventListener('mouseup', window.pin.onMainPinMouseUp);
    window.pin.mapMarker.addEventListener('click', onPinClick);
    window.card.setHandlers();
    window.pin.housingType.addEventListener('change', window.pin.onHousingTypeChange);
    window.pin.housingPrice.addEventListener('change', window.pin.onHousingPriceChange);
    window.pin.roomNumber.addEventListener('change', window.pin.onRoomNumberChange);
    window.pin.guestNumber.addEventListener('change', window.pin.onGuestNumberChange);
  }

  window.backend.load(onSuccessLoad, window.backend.errorHandler);

  function onPinClick(evt) {
    var targetPin = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;
    if (targetPin.classList.contains('map__pin--main') === false && targetPin.classList.contains('map__pin') === true) {
      var pinNumber = parseInt(targetPin.getAttribute('data-number'), 10);
      window.pin.isActive(targetPin);
      targetPin.classList.add('map__pin--active');
      window.showCard(window.data.tickets[pinNumber]);
      // window.showCard(window.pin.filteredData[pinNumber]);
    }
  }

  // Начальное состояние
  window.pin.fadeMap();
  window.card.hide();
  window.form.setFormDisabled();
  window.form.setFieldsDisabled();
  window.form.reset();
  window.form.address.value = 'x: ' + mainPin.offsetLeft + ', y: ' + window.shift.getMainPinY(mainPin.offsetTop, mainPinHeight);

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

    function setAddress(x, y) {
      window.form.address.value = 'x: ' + x + ', y: ' + window.shift.getMainPinY(y, mainPinHeight);
    }

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
      if (newY < (window.data.limitY.min - pinShift)) {
        finalCoords.y = window.data.limitY.min - pinShift;
      } else if (newY > (window.data.limitY.max - pinShift)) {
        finalCoords.y = window.data.limitY.max - pinShift;
      } else {
        finalCoords.y = newY;
      }

      mainPin.style.top = finalCoords.y + 'px';
      mainPin.style.left = finalCoords.x + 'px';
      setAddress(finalCoords.x, finalCoords.y);
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
