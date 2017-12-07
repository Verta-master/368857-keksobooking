'use strict';

(function () {
  var PIN_TAIL = 18;

  window.shift = {
    halfPin: function (pinSize) {
      return Math.floor(pinSize / 2 + PIN_TAIL);
    },
    getPinShiftY: function (locationY, pinSize) {
      return locationY - Math.floor(pinSize / 2 + PIN_TAIL);
    },
    getMainPinY: function (locationY, pinSize) {
      return locationY + Math.floor(pinSize / 2 + PIN_TAIL);
    }
  };
})();
