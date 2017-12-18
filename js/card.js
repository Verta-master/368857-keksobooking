'use strict';

// Заполнение карточки
(function () {
  var ESC_KEYCODE = 27;
  var IMAGE_WIDTH = 40;

  var OfferType = {
    FLAT: 'Квартира',
    HOUSE: 'Дом',
    BUNGALO: 'Бунгало',
    PALACE: 'Дворец'
  };
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);
  var cardCloser = card.querySelector('.popup__close');
  var title = card.querySelector('h3');
  var address = card.querySelector('small');
  var price = card.querySelector('.popup__price');
  var offer = card.querySelector('h4');
  var room = card.querySelector('p:nth-of-type(3)');
  var time = card.querySelector('p:nth-of-type(4)');
  var featureContainer = card.querySelector('.popup__features');
  var description = card.querySelector('p:last-of-type');
  var avatar = card.querySelector('.popup__avatar');
  var photoContainer = card.querySelector('.popup__pictures');

  function getFeaturesList(element) {
    return '<li class="feature feature--' + element + '"></li>';
  }

  function getPhotosList(element) {
    return '<li><img src="' + element + '" width="' + IMAGE_WIDTH + '"></li>';
  }

  function onCardCloserClick() {
    card.classList.add('hidden');
    if (window.pin.activatedPin) {
      window.pin.activatedPin.classList.remove('map__pin--active');
    }
  }

  function onCardKeydown(evt) {
    if (evt.keyCode === ESC_KEYCODE) {
      onCardCloserClick();
    }
  }

  window.card = {
    setData: function (newCard) {
      title.textContent = newCard.offer.title;
      address.textContent = newCard.offer.address;
      price.innerHTML = newCard.offer.price + '&#x20bd;/ночь';
      offer.textContent = OfferType[newCard.offer.type];
      room.textContent = newCard.offer.rooms + ' комнаты для ' + newCard.offer.guests + ' гостей';
      time.textContent = 'Заезд после ' + newCard.offer.checkin + ' выезд до ' + newCard.offer.checkout;
      featureContainer.innerHTML = '';
      featureContainer.insertAdjacentHTML('beforeend', newCard.offer.features.map(getFeaturesList).join(' '));
      description.textContent = newCard.offer.description;
      avatar.src = newCard.author.avatar;
      photoContainer.innerHTML = '';
      photoContainer.insertAdjacentHTML('beforeend', newCard.offer.photos.map(getPhotosList).join(' '));
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
  };
})();
