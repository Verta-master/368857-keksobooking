'use strict';

(function () {
  var PIN_TAIL = 18;

  window.shift = {
    pinHeight: 40,
    getPinShiftY: function (locationY) {
      return locationY - (this.pinHeight / 2 + PIN_TAIL);
    },
  };
})();
