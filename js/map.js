'use strict';

(function () {
  var ESC_KEYCODE = 27;

  var mainPin = document.querySelector('.map__pin--main');
  var activatedPin = false;

  window.card.renderCard(window.data.tickets[0]);
  window.pin.map.appendChild(window.card.card);
  var cardCloser = window.card.card.querySelector('.popup__close');

  // Обработка событий вывода карточки
  function isActivePin(pin) {
    if (activatedPin === false) {
      pin.classList.add('map__pin--active');
    } else {
      activatedPin.classList.remove('map__pin--active');
      pin.classList.add('map__pin--active');
    }
    activatedPin = pin;
  }

  function onCardCloserClick() {
    window.card.card.classList.add('hidden');
    if (activatedPin) {
      activatedPin.classList.remove('map__pin--active');
    }
  }

  function onCardKeydown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onCardCloserClick();
    }
  }

  function onPinClick(evt) {
    var targetPin = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;
    if (targetPin.classList.contains('map__pin--main') === false && targetPin.classList.contains('map__pin') === true) {
      var pinNumber = parseInt(targetPin.getAttribute('data-number'), 10);
      isActivePin(targetPin);
      targetPin.classList.add('map__pin--active');
      window.card.renderCard(window.data.tickets[pinNumber]);
      window.card.card.classList.remove('hidden');
    }
  }

  mainPin.addEventListener('mouseup', window.pin.onMainPinMouseUp);
  window.pin.mapPin.addEventListener('click', onPinClick);
  cardCloser.addEventListener('click', onCardCloserClick);
  document.addEventListener('keydown', onCardKeydown);

  // Начальное состояние
  function setDisabled(item) {
    item.setAttribute('disabled', 'disabled');
  }

  window.card.card.classList.add('hidden');
  window.pin.formFields.forEach(setDisabled);

  if (window.pin.map.classList.contains('map--faded') === false) {
    window.pin.map.classList.add('map--faded');
  }

  if (window.pin.noticeForm.classList.contains('notice__form--disabled') === false) {
    window.pin.noticeForm.classList.add('notice__form--disabled');
  }
})();
