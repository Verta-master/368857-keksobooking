'use strict';

(function () {
  window.pin = {
    // Отрисовка маркеров
    var fragment = document.createDocumentFragment();
    var startMap = false;
    var activatedPin = false;

    function getPinShiftY(locationY) {
      return locationY - (pinHeight / 2 + PIN_TAIL);
    }

    function addPinToFragment(ticket, ticketNumber) {
      var newPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
      newPin.querySelector('img').src = ticket.author.avatar;
      newPin.querySelector('img').width = pinWidth;
      newPin.querySelector('img').height = pinHeight;
      newPin.style.left = ticket.location.x + 'px';
      newPin.style.top = getPinShiftY(ticket.location.y) + 'px';
      newPin.setAttribute('data-number', String(ticketNumber));
      fragment.appendChild(newPin);
    }

    function onMainPinMouseUp() {
      if (startMap === false) {
        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        formFields.forEach(removeDisabled);
        [].forEach.call(tickets, addPinToFragment);
        mapPin.appendChild(fragment);
        startMap = true;
      }
    }

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
      card.classList.add('hidden');
      if (activatedPin) {
        activatedPin.classList.remove('map__pin--active');
      }
    }

    function onPinClick(evt) {
      var targetPin = (evt.target.classList.contains('map__pin')) ? evt.target : evt.target.parentNode;
      if (targetPin.classList.contains('map__pin--main') === false && targetPin.classList.contains('map__pin') === true) {
        var pinNumber = parseInt(targetPin.getAttribute('data-number'), 10);
        isActivePin(targetPin);
        targetPin.classList.add('map__pin--active');
        renderCard(tickets[pinNumber]);
        card.classList.remove('hidden');
      }
    }

    mainPin.addEventListener('mouseup', onMainPinMouseUp);
    mapPin.addEventListener('click', onPinClick);
  }
})();
