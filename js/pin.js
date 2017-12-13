'use strict';

// Отрисовка маркеров
window.pin = (function () {
  var prices = {
    low: 10000,
    middle: 50000
  };
  var pinWidth = 40;
  var pinHeight = 40;
  var startMap = false;
  var filteredPins = [];
  var map = document.querySelector('.map');
  var mapPin = document.querySelector('.map__pins');
  var fragment = document.createDocumentFragment();
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var roomNumber = document.querySelector('#housing-rooms');
  var guestNumber = document.querySelector('#housing-guests');

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

  function housingTypeFiltering(evt) {
    var houseFilter = (evt.offer.type === housingType.value || housingType.value === 'any') ? 1 : 0;
    return houseFilter;
  }

  function housingPriceFiltering(evt) {
    var priceFilter = 0;
    switch (housingPrice.value) {
      case 'any':
        priceFilter = 1;
        break;
      case 'low':
        if (evt.offer.price < prices.low) {
          priceFilter = 1;
        }
        break;
      case 'middle':
        if (evt.offer.price > prices.low && evt.offer.price < prices.middle) {
          priceFilter = 1;
        }
        break;
      case 'high':
        if (evt.offer.price > prices.middle) {
          priceFilter = 1;
        }
    }
    return priceFilter;
  }

  function roomNumberFiltering(evt) {
    var roomFilter = (evt.offer.rooms === parseInt(roomNumber.value, 10) || roomNumber.value === 'any') ? 1 : 0;
    return roomFilter;
  }

  function guestNumberFiltering(evt) {
    var guestFilter = (evt.offer.guests === parseInt(guestNumber.value, 10) || guestNumber.value === 'any') ? 1 : 0;
    return guestFilter;
  }

  function removePin(parentNode) {
    while (parentNode.childElementCount > 2) {
      parentNode.removeChild(parentNode.lastChild);
    }
  }

  function filtrate(filterFunction) {
    filteredPins = window.data.tickets.filter(filterFunction).slice(0, window.data.TICKETS_NUMBER);
    removePin(mapPin);
    [].forEach.call(filteredPins, addPinToFragment);
    mapPin.appendChild(fragment);
  }

  return {
    onMainPinMouseUp: function () {
      if (startMap === false) {
        map.classList.remove('map--faded');
        window.form.setFormActive();
        window.form.setFieldsActive();
        var pinArray = window.data.tickets.slice(0, window.data.TICKETS_NUMBER);
        [].forEach.call(pinArray, addPinToFragment);
        mapPin.appendChild(fragment);
        startMap = true;
      }
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
    housingType: housingType,
    housingPrice: housingPrice,
    roomNumber: roomNumber,
    guestNumber: guestNumber,
    onHousingTypeChange: function () {
      filtrate(housingTypeFiltering);
    },
    onHousingPriceChange: function () {
      filtrate(housingPriceFiltering);
    },
    onRoomNumberChange: function () {
      filtrate(roomNumberFiltering);
    },
    onGuestNumberChange: function () {
      filtrate(guestNumberFiltering);
    },
    filteredData: filteredPins,
  };
})();
