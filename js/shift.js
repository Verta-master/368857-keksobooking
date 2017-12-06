'use strict';

(function () {
  var PIN_TAIL = 18;

  window.shift = {
    getPinShiftY: function (locationY, pinSize) {
      return locationY - Math.floor(pinSize / 2 + PIN_TAIL);
    },
  };
})();
