'use strict';

var OFFER_TITLES = ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'];
var OFFER_TYPES = ['flat', 'house', 'bungalo'];
var OFFER_CHECKINS = ['12:00', '13:00', '14:00'];
var OFFER_CHECKOUTS = ['12:00', '13:00', '14:00'];
var OFFER_FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var TICKETS_NUMBER = 8;

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
var offerType = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало'
};
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
var formField = document.querySelectorAll('fieldset');
var noticeForm = document.querySelector('.notice__form');
var mainPin = document.querySelector('.map__pin--main');
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

function getTickets(numberOfElements) {
  var arrayOfTickets = [];
  for (var i = 0; i < numberOfElements; i++) {
    arrayOfTickets.push(createTicket(i + 1));
  }
  return arrayOfTickets;
}

var tickets = getTickets(TICKETS_NUMBER);

// Начальное состояние
function setDisabled(item) {
  item.setAttribute('disabled', 'disabled');
}

function removeDisabled(item) {
  item.removeAttribute('disabled', 'disabled');
}

formField.forEach(setDisabled);

if (map.classList.contains('map--faded') === false) {
  map.classList.add('map--faded');
}

if (noticeForm.classList.contains('notice__form--disabled') === false) {
  noticeForm.classList.add('notice__form--disabled');
}

// Отрисовка маркеров
function getPinShiftX(locationX) {
  return locationX - pinWidth / 2;
}

function getPinShiftY(locationY) {
  return locationY - pinHeight;
}

function drawPin(ticket) {
  var newPin = document.querySelector('template').content.querySelector('.map__pin').cloneNode(true);
  newPin.querySelector('img').src = ticket.author.avatar;
  newPin.querySelector('img').width = pinWidth;
  newPin.querySelector('img').height = pinHeight;
  newPin.style.left = getPinShiftX(ticket.location.x) + 'px';
  newPin.style.top = getPinShiftY(ticket.location.y) + 'px';
  fragment.appendChild(newPin);
}

function onMainPinMouseUp() {
  map.classList.remove('map--faded');
  noticeForm.classList.remove('notice__form--disabled');
  formField.forEach(removeDisabled);
  tickets.forEach(drawPin);
  mapPin.appendChild(fragment);
}

mainPin.addEventListener('mouseup', onMainPinMouseUp);

// Вывод карточки
function getFeaturesList(element) {
  return '<li class="feature feature--' + element + '"></li>';
}

function renderCard(newCard) {
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);
  card.querySelector('h3').textContent = newCard.offer.title;
  card.querySelector('small').textContent = newCard.offer.address;
  card.querySelector('.popup__price').innerHTML = newCard.offer.price + '&#x20bd;/ночь';
  card.querySelector('h4').textContent = offerType[newCard.offer.type];
  card.querySelector('p:nth-of-type(3)').textContent = newCard.offer.room + ' комнаты для ' + newCard.offer.guests + ' гостей';
  card.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + newCard.offer.checkin + ' выезд до ' + newCard.offer.checkout;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').insertAdjacentHTML('beforeend', newCard.offer.features.map(getFeaturesList).join(' '));
  card.querySelector('p:last-of-type').textContent = newCard.offer.description;
  card.querySelector('.popup__avatar').src = newCard.author.avatar;
  return card;
}

// var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
// fragment.appendChild(renderCard(tickets[0]));
// map.appendChild(fragment);

function onPinClick() {
  var target = event.target;
  target.classList.add('map__pin--active');
  // тут что-то нужно сделать, чтобы не tickets[0] подставлять, а соответствующий элемент
  fragment.appendChild(renderCard(tickets[0]));
  map.appendChild(fragment);
}
mapPin.addEventListener('click', onPinClick);
