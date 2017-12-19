'use strict';

// Фильтры
(function () {
  var prices = {
    low: 10000,
    middle: 50000
  };
  var housingType = document.querySelector('#housing-type');
  var housingPrice = document.querySelector('#housing-price');
  var roomNumber = document.querySelector('#housing-rooms');
  var guestNumber = document.querySelector('#housing-guests');
  var featureContainer = document.querySelector('#housing-features');

  var filters = [
    function housingTypeFiltering(advertisement) {
      return (housingType.value === advertisement.offer.type) || (housingType.value === 'any');
    },

    function housingPriceFiltering(advertisement) {
      var priceFilter;
      switch (housingPrice.value) {
        case 'any':
          priceFilter = 1;
          break;
        case 'low':
          priceFilter = (advertisement.offer.price < prices.low) ? 1 : 0;
          break;
        case 'middle':
          priceFilter = (advertisement.offer.price > prices.low && advertisement.offer.price < prices.middle) ? 1 : 0;
          break;
        case 'high':
          priceFilter = (advertisement.offer.price > prices.middle) ? 1 : 0;
      }
      return priceFilter;
    },

    function roomNumberFiltering(advertisement) {
      var roomFilter = (advertisement.offer.rooms === parseInt(roomNumber.value, 10) || roomNumber.value === 'any') ? 1 : 0;
      return roomFilter;
    },

    function guestNumberFiltering(advertisement) {
      var guestFilter = (advertisement.offer.guests === parseInt(guestNumber.value, 10) || guestNumber.value === 'any') ? 1 : 0;
      return guestFilter;
    },

    function filtrateFeature(advertisement) {
      var checkedElements = featureContainer.querySelectorAll('input[type="checkbox"]:checked');
      var selectedFeatures = [].map.call(checkedElements, function (item) {
        return item.value;
      });

      return selectedFeatures.every(function (currentFeature) {
        return advertisement.offer.features.includes(currentFeature);
      });
    }
  ];

  window.filtering = {
    loadedData: [],
    start: function (loadedData) {
      this.loadedData = loadedData.slice();

      function onFilterChange() {
        var result = loadedData.slice();

        filters.forEach(function (currentFilter) {
          result = result.filter(currentFilter);
        });
        window.pin.showFiteredArray(result);
        window.filtering.loadedData = result;
      }

      housingType.addEventListener('change', onFilterChange);
      housingPrice.addEventListener('change', onFilterChange);
      roomNumber.addEventListener('change', onFilterChange);
      guestNumber.addEventListener('change', onFilterChange);
      featureContainer.addEventListener('change', onFilterChange);
    }
  };
})();
