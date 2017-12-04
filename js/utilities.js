'use strict';

(function () {
  window.data = {
    // Случайное целое из диапазона (min, max), не включая max
    getRandomInt: function(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    // Случайный элемент из массива
    getRandomArrayElement: function(customArray) {
      return customArray[getRandomInt(0, customArray.length)];
    },

    // Массив случайной длины из заданного массива
    getUniqueArray: function(customArray) {
      var arrCopy = customArray.slice();
      var startIndex = getRandomInt(0, customArray.length);
      var numberElement = getRandomInt(0, customArray.length - startIndex);
      return arrCopy.splice(startIndex, numberElement);
    },
  };
})();
