'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TICKETS_NUMBER = 8;

var pinWidth = 40;
var pinHeight = 40;
var tickets = [];
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
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

// Случайное целое из диапазона (min, max), не включая max
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Случайный элемент из массива
function getRandomArrayElement(customArray) {
  return customArray[getRandomInt(0, customArray.length)];
}

// Массив случайной длины из уникальных элементов
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

for (var i = 0; i < TICKETS_NUMBER; i++) {
  tickets.push(createTicket(i + 1));
}

// Отрисовка маркеров
map.classList.remove('map--faded');

function drawPin(ticket) {
  var coordLeft = ticket.location.x - pinWidth / 2;
  var coordTop = ticket.location.y - pinHeight;
  var newPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  newPin.querySelector('img').src = ticket.author.avatar;
  newPin.querySelector('img').width = pinWidth;
  newPin.querySelector('img').height = pinHeight;
  newPin.style = 'left: ' + String(coordLeft) + 'px; top: ' + String(coordTop) + 'px;';
  return newPin;
}

for (i = 0; i < TICKETS_NUMBER; i++) {
  fragment.appendChild(drawPin(tickets[i]));
}
mapPin.appendChild(fragment);

// Вывод карточки
function getOfferType(type) {
  var offerType;
  switch (type) {
    case 'flat':
      offerType = 'Квартира';
      break;
    case 'house':
      offerType = 'Дом';
      break;
    case 'bungalo':
      offerType = 'Бунгало';
  }
  return offerType;
}

var getFeaturesList = function (element) {
  return '<li class="feature feature--' + element + '"></li>';
};

var renderCard = function (newCard) {
  var card = cardTemplate.cloneNode(true);
  card.querySelector('h3').textContent = newCard.offer.title;
  card.querySelector('small').textContent = newCard.offer.address;
  card.querySelector('.popup__price').innerHTML = newCard.offer.price + '&#x20bd;/ночь';
  card.querySelector('h4').textContent = getOfferType(newCard.offer.type);
  card.querySelector('p:nth-of-type(3)').textContent = newCard.offer.room + ' комнаты для ' + newCard.offer.guests + ' гостей';
  card.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + newCard.offer.checkin + ' выезд до ' + newCard.offer.checkout;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').insertAdjacentHTML('beforeend', newCard.offer.features.map(getFeaturesList).join(' '));
  card.querySelector('p:last-of-type').textContent = newCard.offer.description;
  card.querySelector('.popup__avatar').src = newCard.author.avatar;
  return card;
};

var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
fragment.appendChild(renderCard(tickets[0]));
map.appendChild(fragment);
