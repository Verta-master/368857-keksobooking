'use strict';

// Фильтры
window.filtering = (function () {
  var prices = {
    low: 10000,
    middle: 50000
  };
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var roomNumber = document.querySelector('#housing-rooms');
  var guestNumber = document.querySelector('#housing-guests');
  var featureContainer = document.querySelector('#housing-features');
  var wifi = document.querySelector('#filter-wifi');
  var dishwasher = document.querySelector('#filter-dishwasher');
  var parking = document.querySelector('#filter-parking');
  var washer = document.querySelector('#filter-washer');
  var elevator = document.querySelector('#filter-elevator');
  var conditioner = document.querySelector('#filter-conditioner');

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

//  function isFeature(customArray, featureName) {
//    [].reduce.call(customArray, function(item) {
//      var featureFilter = (item.offer.features.indexOf(featureName) === -1) ? 0 : 1;
//      return featureFilter;
//    });
//  }
  function isFeature() {
    [].forEach.call(window.data.tickets, function(item) {
      var featureFilter = (item.offer.features.indexOf(this) === -1) ? 0 : 1;
      return featureFilter;
    });
  }

  function filtrate(customArray, filterFunction) {
    return customArray.filter(filterFunction).slice(0, window.data.TICKETS_NUMBER);
  }

 return {
    housingType: housingType,
    housingPrice: housingPrice,
    roomNumber: roomNumber,
    guestNumber: guestNumber,
    feature: featureContainer,
    filtrateHouseType: function () {
      return filtrate(window.data.tickets, housingTypeFiltering);
    },
    filtrateHousePrice: function () {
      return filtrate(window.data.tickets, housingPriceFiltering);
    },
    filtrateRoomNumber: function () {
      return filtrate(window.data.tickets, roomNumberFiltering);
    },
    filtrateGuestNumber: function () {
      return filtrate(window.data.tickets, guestNumberFiltering);
    },
    filtrateFeature: function () {
      for (var k = 0; k < featureContainer.childElementCount; k++) {
        if (featureContainer.children[k].checked) {
          var data = window.data.tickets.filter(isFeature, featureContainer.children[k].value).slice(0, window.data.TICKETS_NUMBER);
          // isFeature(window.data.tickets, featureContainer.children[k].value);
        }
      }
      return data;
    }
  };
})();
