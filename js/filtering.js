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
      var priceFilter = 0;
      switch (housingPrice.value) {
        case 'any':
          priceFilter = 1;
          break;
        case 'low':
          if (advertisement.offer.price < prices.low) {
            priceFilter = 1;
          }
          break;
        case 'middle':
          if (advertisement.offer.price > prices.low && advertisement.offer.price < prices.middle) {
            priceFilter = 1;
          }
          break;
        case 'high':
          if (advertisement.offer.price > prices.middle) {
            priceFilter = 1;
          }
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
  ];

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
    return filteredData;
  }

  window.filtering = {
    startFilters: function (loadedData) {
      function onFilterChange() {
        var result = loadedData.slice();

        filters.forEach(function (currentFilter) {
          result = result.filter(currentFilter);
        });
        // result = filtrateFeature(result);
        window.pin.showFiteredArray(result);
      }

      housingType.addEventListener('change', onFilterChange);
      housingPrice.addEventListener('change', onFilterChange);
      roomNumber.addEventListener('change', onFilterChange);
      guestNumber.addEventListener('change', onFilterChange);
      featureContainer.addEventListener('change', onFilterChange);
    }
  };
})();

