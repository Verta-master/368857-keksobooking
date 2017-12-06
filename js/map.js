'use strict';

(function () {
  var mainPin = document.querySelector('.map__pin--main');

  function onPinClick(evt) {
    var targetPin = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;
    if (targetPin.classList.contains('map__pin--main') === false && targetPin.classList.contains('map__pin') === true) {
      var pinNumber = parseInt(targetPin.getAttribute('data-number'), 10);
      window.pin.isActive(targetPin);
      targetPin.classList.add('map__pin--active');
      window.card.setData(window.data.tickets[pinNumber]);
      window.card.show();
    }
  }

  window.card.setData(window.data.tickets[0]);
  window.card.render(window.pin.map);
  mainPin.addEventListener('mouseup', window.pin.onMainPinMouseUp);
  window.pin.mapMarker.addEventListener('click', onPinClick);
  window.card.setHandlers();

  // Начальное состояние
  window.pin.fadeMap();
  window.card.hide();
  window.form.setFormDisabled();
  window.form.setFieldsDisabled();
})();
