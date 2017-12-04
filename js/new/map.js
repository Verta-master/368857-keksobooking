'use strict';

(function () {
  window.map = {
    var formFields = document.querySelectorAll('fieldset');
    var noticeForm = document.querySelector('.notice__form');

    // Начальное состояние
    function setDisabled(item) {
      item.setAttribute('disabled', 'disabled');
    }

    function removeDisabled(item) {
      item.removeAttribute('disabled', 'disabled');
    }

    card.classList.add('hidden');
    formFields.forEach(setDisabled);

    if (map.classList.contains('map--faded') === false) {
      map.classList.add('map--faded');
    }

    if (noticeForm.classList.contains('notice__form--disabled') === false) {
      noticeForm.classList.add('notice__form--disabled');
    }
  }
})();
