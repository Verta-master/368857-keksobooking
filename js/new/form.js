'use strict';

(function () {
  // работа с формой
  var titleLengths = {
    min: 30,
    max: 100
  };
  var minPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  noticeForm = window.map.noticeForm;
  var addressField = noticeForm.querySelector('#address');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var timeInField = noticeForm.querySelector('#timein');
  var timeOutField = noticeForm.querySelector('#timeout');
  var houseType = noticeForm.querySelector('#type');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');

  function setFieldBorder(field, color) {
    field.style.borderColor = color;
  }

  function onTitleFieldInvalid(evt) {
    setFieldBorder(evt.target, 'red');
    if (evt.target.validity.tooShort || evt.target.value.length < titleLengths.max) {
      evt.target.setCustomValidity('Минимум ' + evt.target.getAttribute('minlength') + ' символов');
    } else if (evt.target.validity.tooLong) {
      evt.target.setCustomValidity('Не более ' + evt.target.getAttribute('maxlength') + ' символов');
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
      setFieldBorder(evt.target, 'transparent');
    }
  }

  function onPriceFieldInvalid(evt) {
    setFieldBorder(evt.target, 'red');
    if (evt.target.value < parseInt(evt.target.getAttribute('min'), 10)) {
      evt.target.setCustomValidity('Минимальное значение: ' + evt.target.getAttribute('min'));
    } else if (evt.target.value > parseInt(evt.target.getAttribute('max'), 10)) {
      evt.target.setCustomValidity('Максимальное значение: ' + evt.target.getAttribute('max'));
    } else if (evt.target.validity.valueMissing) {
      evt.target.setCustomValidity('Обязательное поле');
    } else {
      evt.target.setCustomValidity('');
      setFieldBorder(evt.target, 'transparent');
    }
  }

  function onTimeInFieldChange(evt) {
    timeOutField.value = evt.target.value;
  }

  function onTimeOutFieldChange(evt) {
    timeInField.value = evt.target.value;
  }

  function onHouseTypeChange(evt) {
    priceField.setAttribute('min', minPrices[evt.target.value]);
  }

  function onRoomNumberChange() {
    capacity.value = (roomNumber.value !== '100') ? roomNumber.value : 0;
    var index = capacity.length - capacity.value - 1;
    for (var i = 0; i < capacity.length; i++) {
      if (i === index) {
        capacity.options[i].removeAttribute('disabled', 'disabled');
      } else {
        capacity.options[i].setAttribute('disabled', 'disabled');
      }
    }
  }

  noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
  addressField.setAttribute('readonly', 'true');
  addressField.setAttribute('required', 'true');
  addressField.setAttribute('value', 'Здесь будет адрес');
  titleField.setAttribute('minlength', titleLengths.min);
  titleField.setAttribute('maxlength', titleLengths.max);
  titleField.setAttribute('required', 'true');
  priceField.setAttribute('required', 'true');
  priceField.setAttribute('min', '0');
  priceField.setAttribute('max', prices.max);
  priceField.setAttribute('value', prices.min);
  capacity.value = roomNumber.value;
  for (var i = 0; i < capacity.length; i++) {
    capacity.options[i].setAttribute('disabled', 'disabled');
  }

  titleField.addEventListener('invalid', onTitleFieldInvalid);
  priceField.addEventListener('invalid', onPriceFieldInvalid);

  timeInField.addEventListener('change', onTimeInFieldChange);
  timeOutField.addEventListener('change', onTimeOutFieldChange);
  houseType.addEventListener('change', onHouseTypeChange);
  roomNumber.addEventListener('change', onRoomNumberChange);
})();
