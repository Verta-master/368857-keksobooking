'use strict';

var ESC_KEYCODE = 27;
var pinWidth = 40;
var offerTypes = {
  flat: 'Квартира',
  house: 'Дом',
  bungalo: 'Бунгало',
  palace: 'Дворец'
};
var minPrices = {
  bungalo: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};
var titleLengths = {
  min: 30,
  max: 100
};
var map = document.querySelector('.map');
var mapPin = document.querySelector('.map__pins');
var formFields = document.querySelectorAll('fieldset');
var noticeForm = document.querySelector('.notice__form');
var mainPin = document.querySelector('.map__pin--main');
var activatedPin = false;
var startMap = false;
var fragment = document.createDocumentFragment();
var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
var card = cardTemplate.cloneNode(true);
var cardCloser = card.querySelector('.popup__close');
var addressField = noticeForm.querySelector('#address');
var titleField = noticeForm.querySelector('#title');
var priceField = noticeForm.querySelector('#price');
var timeInField = noticeForm.querySelector('#timein');
var timeOutField = noticeForm.querySelector('#timeout');
var houseType = noticeForm.querySelector('#type');
var roomNumber = noticeForm.querySelector('#room_number');
var capacity = noticeForm.querySelector('#capacity');

// Отрисовка маркеров

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

function onMainPinMouseUp() {
  if (startMap === false) {
    map.classList.remove('map--faded');
    noticeForm.classList.remove('notice__form--disabled');
    formFields.forEach(removeDisabled);
    [].forEach.call(window.data.tickets, addPinToFragment);
    mapPin.appendChild(fragment);
    startMap = true;
  }
}

// Отрисовка карточки
function getFeaturesList(element) {
  return '<li class="feature feature--' + element + '"></li>';
}

function renderCard(newCard) {
  card.querySelector('h3').textContent = newCard.offer.title;
  card.querySelector('small').textContent = newCard.offer.address;
  card.querySelector('.popup__price').innerHTML = newCard.offer.price + '&#x20bd;/ночь';
  card.querySelector('h4').textContent = offerTypes[newCard.offer.type];
  card.querySelector('p:nth-of-type(3)').textContent = newCard.offer.room + ' комнаты для ' + newCard.offer.guests + ' гостей';
  card.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + newCard.offer.checkin + ' выезд до ' + newCard.offer.checkout;
  card.querySelector('.popup__features').innerHTML = '';
  card.querySelector('.popup__features').insertAdjacentHTML('beforeend', newCard.offer.features.map(getFeaturesList).join(' '));
  card.querySelector('p:last-of-type').textContent = newCard.offer.description;
  card.querySelector('.popup__avatar').src = newCard.author.avatar;
}

renderCard(window.data.tickets[0]);
map.appendChild(card);

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
  card.classList.add('hidden');
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
    renderCard(window.data.tickets[pinNumber]);
    card.classList.remove('hidden');
  }
}

mainPin.addEventListener('mouseup', onMainPinMouseUp);
mapPin.addEventListener('click', onPinClick);
cardCloser.addEventListener('click', onCardCloserClick);
document.addEventListener('keydown', onCardKeydown);

// Начальное состояние
function setDisabled(item) {
  item.setAttribute('disabled', 'disabled');
}

function removeDisabled(item) {
  item.removeAttribute('disabled', 'disabled');
}

card.classList.add('hidden');
formFields.forEach(setDisabled);

if (map.classList.contains('map--faded') === false) {
  map.classList.add('map--faded');
}

if (noticeForm.classList.contains('notice__form--disabled') === false) {
  noticeForm.classList.add('notice__form--disabled');
}

// работа с формой
function setFieldBorder(field, color) {
  field.style.borderColor = color;
}

function onTitleFieldInvalid(evt) {
  setFieldBorder(evt.target, 'red');
  if (evt.target.validity.tooShort) {
    evt.target.setCustomValidity('Минимум ' + evt.target.getAttribute('minlength') + ' символов');
  } else if (evt.target.validity.tooLong) {
    evt.target.setCustomValidity('Не более ' + evt.target.getAttribute('maxlength') + ' символов');
  } else if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Обязательное поле');
  } else {
    evt.target.setCustomValidity('');
    setFieldBorder(evt.target, 'transparent');
  }
}

function onPriceFieldInvalid(evt) {
  setFieldBorder(evt.target, 'red');
  if (evt.target.value < parseInt(evt.target.getAttribute('min'), 10)) {
    evt.target.setCustomValidity('Минимальное значение: ' + evt.target.getAttribute('min'));
  } else if (evt.target.value > parseInt(evt.target.getAttribute('max'), 10)) {
    evt.target.setCustomValidity('Максимальное значение: ' + evt.target.getAttribute('max'));
  } else if (evt.target.validity.valueMissing) {
    evt.target.setCustomValidity('Обязательное поле');
  } else {
    evt.target.setCustomValidity('');
    setFieldBorder(evt.target, 'transparent');
  }
}

function onTimeInFieldChange(evt) {
  timeOutField.value = evt.target.value;
}

function onTimeOutFieldChange(evt) {
  timeInField.value = evt.target.value;
}

function onHouseTypeChange(evt) {
  priceField.setAttribute('min', minPrices[evt.target.value]);
}

function onRoomNumberChange() {
  capacity.value = (roomNumber.value !== '100') ? roomNumber.value : 0;
  var index = capacity.length - capacity.value - 1;
  for (var i = 0; i < capacity.length; i++) {
    if (i === index) {
      capacity.options[i].removeAttribute('disabled', 'disabled');
    } else {
      capacity.options[i].setAttribute('disabled', 'disabled');
    }
  }
}

noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
addressField.setAttribute('readonly', 'true');
addressField.setAttribute('required', 'true');
addressField.setAttribute('value', 'Здесь будет адрес');
titleField.setAttribute('minlength', titleLengths.min);
titleField.setAttribute('maxlength', titleLengths.max);
titleField.setAttribute('required', 'true');
priceField.setAttribute('required', 'true');
priceField.setAttribute('min', '0');
priceField.setAttribute('max', prices.max);
priceField.setAttribute('value', prices.min);
capacity.value = roomNumber.value;
for (var i = 0; i < capacity.length; i++) {
  capacity.options[i].setAttribute('disabled', 'disabled');
}

titleField.addEventListener('invalid', onTitleFieldInvalid);
priceField.addEventListener('invalid', onPriceFieldInvalid);

timeInField.addEventListener('change', onTimeInFieldChange);
timeOutField.addEventListener('change', onTimeOutFieldChange);
houseType.addEventListener('change', onHouseTypeChange);
roomNumber.addEventListener('change', onRoomNumberChange);
