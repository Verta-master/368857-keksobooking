'use strict';

// Отрисовка маркеров
window.pin = (function () {
  var pinWidth = 40;
  var startMap = false;
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pins');
  var formFields = document.querySelectorAll('fieldset');
  var noticeForm = document.querySelector('.notice__form');
  var fragment = document.createDocumentFragment();

  function addPinToFragment(ticket, ticketNumber) {
    var newPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
    newPin.querySelector('img').src = ticket.author.avatar;
    newPin.querySelector('img').width = pinWidth;
    newPin.querySelector('img').height = window.shift.pinHeight;
    newPin.style.left = ticket.location.x + 'px';
    newPin.style.top = window.shift.getPinShiftY(ticket.location.y) + 'px';
    newPin.setAttribute('data-number', String(ticketNumber));
    fragment.appendChild(newPin);
  }

  function removeDisabled(item) {
    item.removeAttribute('disabled', 'disabled');
  }

  return {
    onMainPinMouseUp: function () {
      if (startMap === false) {
        map.classList.remove('map--faded');
        noticeForm.classList.remove('notice__form--disabled');
        formFields.forEach(removeDisabled);
        [].forEach.call(window.data.tickets, addPinToFragment);
        mapPin.appendChild(fragment);
        startMap = true;
      }
    },
    map: map,
    mapPin: mapPin,
    formFields: formFields,
    noticeForm: noticeForm,
  };
})();
