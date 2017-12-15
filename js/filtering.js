'use strict';

// Фильтры
window.filtering = (function () {
  var prices = {
    low: 10000,
    middle: 50000
  };
  var filteredPins = window.data.tickets;
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var roomNumber = document.querySelector('#housing-rooms');
  var guestNumber = document.querySelector('#housing-guests');
  var featureContainer = document.querySelector('#housing-features');

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

  function filtrate(customArray, filterFunction) {
    return customArray.filter(filterFunction).slice(0, window.data.TICKETS_NUMBER);
  }

  function filtrateHouseType(customArray) {
    return filtrate(customArray, housingTypeFiltering);
  };

  function filtrateHousePrice(customArray) {
    return filtrate(customArray, housingPriceFiltering);
  };

  function filtrateRoomNumber(customArray) {
    return filtrate(customArray, roomNumberFiltering);
  };

  function filtrateGuestNumber(customArray) {
    return filtrate(customArray, guestNumberFiltering);
  };

  function filtrateFeature(customArray) {
    var checkedData = [];
    for (var k = 0; k < featureContainer.childElementCount; k++) {
      if (featureContainer.children[k].checked) {
        checkedData.push(featureContainer.children[k].value);
      }
    }
    var filteredData = customArray.filter(function (item) {
      return item.offer.features.some(function (element) {
        return checkedData.includes(element);
      });
    });
    return filteredData.slice(0, window.data.TICKETS_NUMBER);
  };

  function applyFilter(customArray) {
    var newArray = customArray.slice();
    newArray = newArray.filter(housingTypeFiltering).slice();
    newArray = newArray.filter(housingPriceFiltering).slice();
    newArray = newArray.filter(roomNumberFiltering).slice();
    newArray = newArray.filter(guestNumberFiltering).slice();
    return newArray;
  }

  return {
    housingType: housingType,
    housingPrice: housingPrice,
    roomNumber: roomNumber,
    guestNumber: guestNumber,
    feature: featureContainer,
    onFilterChange: function () {
//      var arrayOfFunctions = [
//        filtrateHouseType,
//        filtrateHousePrice,
//        filtrateRoomNumber,
//        filtrateGuestNumber,
//        filtrateFeature,
//        window.pin.showFiteredArray
//      ];
//      arrayOfFunctions.forEach(function (item) {
//        item(window.data.tickets);
//      });
      filteredPins = applyFilter(filteredPins);
      window.pin.showFiteredArray(filteredPins);
    },
    filteredData: filteredPins,
  };
})();