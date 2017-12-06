'use strict';

(function () {
//  var ESC_KEYCODE = 27;

  var mainPin = document.querySelector('.map__pin--main');

  window.card.render(window.data.tickets[0]);
  window.pin.map.appendChild(window.card.label);

  // Обработка событий вывода карточки

  //  function onCardCloserClick() {
  //    window.card.label.classList.add('hidden');
  //    if (window.pin.activatedPin !== false) {
  //      window.pin.activatedPin.classList.remove('map__pin--active');
  //    }
  //  }
  //
  //  function onCardKeydown(evt) {
  //    if (evt.keyCode === ESC_KEYCODE) {
  //      onCardCloserClick();
  //    }
  //  }

  function onPinClick(evt) {
    var targetPin = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;
    if (targetPin.classList.contains('map__pin--main') === false && targetPin.classList.contains('map__pin') === true) {
      var pinNumber = parseInt(targetPin.getAttribute('data-number'), 10);
      window.pin.isActive(targetPin);
      targetPin.classList.add('map__pin--active');
      window.card.render(window.data.tickets[pinNumber]);
      window.card.label.classList.remove('hidden');
    }
  }

  mainPin.addEventListener('mouseup', window.pin.onMainPinMouseUp);
  window.pin.mapMarker.addEventListener('click', onPinClick);
  window.card.close.addEventListener('click', window.card.onCardCloserClick);
  document.addEventListener('keydown', window.card.onCardKeydown);

  // Начальное состояние
  function setDisabled(item) {
    item.setAttribute('disabled', 'disabled');
  }

  window.card.label.classList.add('hidden');
  window.pin.formFields.forEach(setDisabled);

  if (window.pin.map.classList.contains('map--faded') === false) {
    window.pin.map.classList.add('map--faded');
  }

  if (window.pin.noticeForm.classList.contains('notice__form--disabled') === false) {
    window.pin.noticeForm.classList.add('notice__form--disabled');
  }
})();
