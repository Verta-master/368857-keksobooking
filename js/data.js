'use strict';

(function () {
  window.data = {
    var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
    var OFFER_TYPES = ['flat', 'house', 'bungalo'];
    var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
    var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
    var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
    var TICKETS_NUMBER = 8;
    var ESC_KEYCODE = 27;
    var PIN_TAIL = 18;

    var pinWidth = 40;
    var pinHeight = 40;
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
    var offerTypes = {
      flat: 'Квартира',
      house: 'Дом',
      bungalo: 'Бунгало',
      palace: 'Дворец'
    };

    // Случайное целое из диапазона (min, max), не включая max
    function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }

    // Случайный элемент из массива
    function getRandomArrayElement(customArray) {
      return customArray[getRandomInt(0, customArray.length)];
    }

    // Массив случайной длины из заданного массива
    function getUniqueArray(customArray) {
      var arrCopy = customArray.slice();
      var startIndex = getRandomInt(0, customArray.length);
      var numberElement = getRandomInt(0, customArray.length - startIndex);
      return arrCopy.splice(startIndex, numberElement);
    }

    // Заполнение массива данных
    function createTicket(number) {
      var locationX = getRandomInt(coords.x.min, coords.x.max);
      var locationY = getRandomInt(coords.y.min, coords.y.max);
      var ticket = {
        author: {
          avatar: 'img/avatars/user0' + String(number) + '.png'
        },
        offer: {
          title: arrTitles.splice(getRandomInt(0, arrTitles.length), 1),
          address: '(' + String(locationX) + ', ' + String(locationY) + ')',
          price: getRandomInt(prices.min, prices.max),
          type: getRandomArrayElement(OFFER_TYPES),
          room: getRandomInt(rooms.min, rooms.max + 1),
          guests: getRandomInt(guests.min, guests.max + 1),
          checkin: getRandomArrayElement(OFFER_CHECKINS),
          checkout: getRandomArrayElement(OFFER_CHECKOUTS),
          features: [],
          description: '',
          photos: []
        },
        location: {
          x: locationX,
          y: locationY
        }
      };
      ticket.offer.features = getUniqueArray(OFFER_FEATURES).slice();
      return ticket;
    }

    function getTickets(numberOfElements) {
      var arrayOfTickets = [];
      for (var i = 0; i < numberOfElements; i++) {
        arrayOfTickets.push(createTicket(i + 1));
      }
      return arrayOfTickets;
    }

    var tickets = getTickets(TICKETS_NUMBER);
  }
})();
