'use strict';

(function () {
  var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
  var OFFER_TYPES = ['flat', 'house', 'bungalo'];
  var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
  var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
  var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var TICKETS_NUMBER = 8;
  var arrTitles = OFFER_TITLES.slice();
  var coords = {
    x: {
      min: 300,
      max: 900
    },
    y: {
      min: 100,
      max: 500
    }
  };
  var prices = {
    min: 1E3,
    max: 1E6
  };
  var rooms = {
    min: 1,
    max: 5
  };
  var guests = {
    min: 0,
    max: 10
  };

  // Заполнение массива данных
  function createTicket(number) {
    var locationX = window.utilities.getRandomInt(coords.x.min, coords.x.max);
    var locationY = window.utilities.getRandomInt(coords.y.min, coords.y.max);
    var ticket = {
      author: {
        avatar: 'img/avatars/user0' + String(number) + '.png'
      },
      offer: {
        title: arrTitles.splice(window.utilities.getRandomInt(0, arrTitles.length), 1),
        address: '(' + String(locationX) + ', ' + String(locationY) + ')',
        price: window.utilities.getRandomInt(prices.min, prices.max),
        type: window.utilities.getRandomArrayElement(OFFER_TYPES),
        room: window.utilities.getRandomInt(rooms.min, rooms.max + 1),
        guests: window.utilities.getRandomInt(guests.min, guests.max + 1),
        checkin: window.utilities.getRandomArrayElement(OFFER_CHECKINS),
        checkout: window.utilities.getRandomArrayElement(OFFER_CHECKOUTS),
        features: [],
        description: '',
        photos: []
      },
      location: {
        x: locationX,
        y: locationY
      }
    };
    ticket.offer.features = window.utilities.getUniqueArray(OFFER_FEATURES).slice();
    return ticket;
  }

  function getTickets(numberOfElements) {
    var arrayOfTickets = [];
    for (var i = 0; i < numberOfElements; i++) {
      arrayOfTickets.push(createTicket(i + 1));
    }
    return arrayOfTickets;
  }

  window.data = {
    getMinPrice: function () {
      return prices.min;
    },
    getMaxPrice: function () {
      return prices.max;
    },
    tickets: getTickets(TICKETS_NUMBER),
    limitY: coords.y,
    TICKETS_NUMBER: TICKETS_NUMBER,
  };
})();
