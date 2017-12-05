'use strict';

// Заполнение карточки
window.card = (function () {
  var offerTypes = {
    flat: 'Квартира',
    house: 'Дом',
    bungalo: 'Бунгало',
    palace: 'Дворец'
  };
  var cardTemplate = document.querySelector('template').content.querySelector('.map__card');
  var card = cardTemplate.cloneNode(true);

  function getFeaturesList(element) {
    return '<li class="feature feature--' + element + '"></li>';
  }

  return {
    renderCard: function (newCard) {
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
    },
    card: card,
  };
})();
