'use strict';

(function () {
  window.showCard = function (data) {
    window.card.setData(data);
    window.card.label.classList.remove('hidden');
  };
})();
