'use strict';

// Заполнение карточки
window.card = (function () {
  var ESC_KEYCODE = 27;

  var offerTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);
  var cardCloser = card.querySelector('.popup__close');

  function getFeaturesList(element) {
    return '<li class="feature feature--' + element + '"></li>';
  }

  function getPhotosList(element) {
    return '<li><img src="' + element + '" width="' + 100 + '"></li>';
  }

  function onCardCloserClick() {
    card.classList.add('hidden');
    if (window.pin.activatedPin !== false) {
      window.pin.activatedPin.classList.remove('map__pin--active');
    }
  }

  function onCardKeydown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onCardCloserClick();
    }
  }

  return {
    setData: function (newCard) {
      card.querySelector('h3').textContent = newCard.offer.title;
      card.querySelector('small').textContent = newCard.offer.address;
      card.querySelector('.popup__price').innerHTML = newCard.offer.price + '&#x20bd;/ночь';
      card.querySelector('h4').textContent = offerTypes[newCard.offer.type];
      card.querySelector('p:nth-of-type(3)').textContent = newCard.offer.rooms + ' комнаты для ' + newCard.offer.guests + ' гостей';
      card.querySelector('p:nth-of-type(4)').textContent = 'Заезд после ' + newCard.offer.checkin + ' выезд до ' + newCard.offer.checkout;
      card.querySelector('.popup__features').innerHTML = '';
      card.querySelector('.popup__features').insertAdjacentHTML('beforeend', newCard.offer.features.map(getFeaturesList).join(' '));
      card.querySelector('p:last-of-type').textContent = newCard.offer.description;
      card.querySelector('.popup__avatar').src = newCard.author.avatar;
      card.querySelector('.popup__pictures').innerHTML = '';
      card.querySelector('.popup__pictures').insertAdjacentHTML('beforeend', newCard.offer.photos.map(getPhotosList).join(' '));
    },
    render: function (container) {
      container.appendChild(card);
    },
    hide: function () {
      card.classList.add('hidden');
    },
    show: function () {
      card.classList.remove('hidden');
    },
    setHandlers: function () {
      cardCloser.addEventListener('click', onCardCloserClick);
      document.addEventListener('keydown', onCardKeydown);
    },
    label: card
  };
})();
