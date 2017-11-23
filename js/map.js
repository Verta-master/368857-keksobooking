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
var avatarNumbers = [];
var arrTitles = [];
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

// Нахождение случайного целого из диапазона
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// Заполнение массива данных
for (var i = 0; i < TICKETS_NUMBER; i++) {
  avatarNumbers[i] = i + 1;
}

for (i = 0; i < OFFER_TITLES.length; i++) {
  arrTitles[i] = OFFER_TITLES[i];
}

function createTicket() {
  var locationX = getRandomInt(300, 900);
  var locationY = getRandomInt(100, 500);
  var featureLength = getRandomInt(0, OFFER_FEATURES.length);
  var ticket = {
    author: {
      avatar: 'img/avatars/user0' + avatarNumbers.splice(getRandomInt(0, avatarNumbers.length), 1) + '.png'
    },
    offer: {
      title: arrTitles.splice(getRandomInt(0, arrTitles.length), 1),
      address: '(' + String(locationX) + ', ' + String(locationY) + ')',
      price: getRandomInt(1E3, 1E6),
      type: OFFER_TYPES[getRandomInt(0, 3)],
      rooms: getRandomInt(1, 6),
      guests: getRandomInt(0, 10),
      checkin: OFFER_CHECKINS[getRandomInt(0, 3)],
      checkout: OFFER_CHECKOUTS[getRandomInt(0, 3)],
      features: [],
      description: '',
      photos: []
    },
    location: {
      x: locationX,
      y: locationY
    }
  };
  ticket.offer.features.length = featureLength;
  for (var j = 0; j < featureLength; j++) {
    ticket.offer.features[j] = OFFER_FEATURES[getRandomInt(0, OFFER_FEATURES.length)];
  }
  return ticket;
}

for (i = 0; i < TICKETS_NUMBER; i++) {
  tickets.push(createTicket());
}
console.log(tickets);

// Отрисовка маркеров
map.classList.remove('map--faded');

for (i = 0; i < TICKETS_NUMBER; i++) {
  var coordLeft = tickets[i].location.x - pinWidth / 2;
  var coordTop = tickets[i].location.y - pinHeight;
  var newPin = '<button style="left: ' + String(coordLeft) + 'px; top: ' + String(coordTop) + 'px;" class="map__pin"><img src="' + String(tickets[i].author.avatar) + '" width="' + String(pinWidth) + '" height="' + String(pinHeight) + '" draggable="false"></button>';
  mapPin.insertAdjacentHTML('beforeend', newPin);
}
mapPin.appendChild(fragment);


//var mapCard = document.querySelector('.map__card');

//var renderCard = function(ticket) {
//  var card = mapCard.content.cloneNode(true);
//  card.querySelector(h3).textContent = ticket.offer.title;
//  card.querySelector(small).textContent = ticket.offer.address;
//  card.querySelector('.popup__price').textContent = ticket.offer.price + '&#x20bd;/ночь';
//
//  switch (ticket.offer.type) {
//    case 'flat':
//      card.querySelector(h4).textContent = 'Квартира';
//      break;
//    case 'house':
//      card.querySelector(h4).textContent = 'Дом';
//      break;
//    case 'bungalo':
//      card.querySelector(h4).textContent = 'Дом';
//      break;
//  }
//
//  return card;
//}

//  renderCard(tickets[i]);
//  map.insertAdjacentHTML('beforeend', renderCard(tickets[i]));
//map.appendChild(fragment);
