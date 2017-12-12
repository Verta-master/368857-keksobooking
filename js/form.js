'use strict';

// работа с формой
(function () {
  var minPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var titleLengths = {
    min: 30,
    max: 100
  };
  var initValues = {
    type: 'flat',
    price: 1000,
    timein: '12:00',
    timeout: '12:00',
    room: 1,
    capacity: 1
  };
  var formFields = document.querySelectorAll('fieldset');
  var noticeForm = document.querySelector('.notice__form');
  var addressField = noticeForm.querySelector('#address');
  var titleField = noticeForm.querySelector('#title');
  var priceField = noticeForm.querySelector('#price');
  var timeInField = noticeForm.querySelector('#timein');
  var timeOutField = noticeForm.querySelector('#timeout');
  var houseType = noticeForm.querySelector('#type');
  var roomNumber = noticeForm.querySelector('#room_number');
  var capacity = noticeForm.querySelector('#capacity');
  var features = noticeForm.querySelectorAll('input[type="checkbox"]');
  var description = noticeForm.querySelector('#description');
  var imageLoad = noticeForm.querySelector('#images');

  function setFieldBorder(field, color) {
    field.style.borderColor = color;
  }

  function removeDisabled(item) {
    item.removeAttribute('disabled', 'disabled');
  }

  function setDisabled(item) {
    item.setAttribute('disabled', 'disabled');
  }

  function onTitleFieldInvalid(evt) {
    setFieldBorder(evt.target, 'red');
    if (evt.target.validity.tooShort) {
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

  function onAddressFieldInvalid(evt) {
    if (evt.target.validity.valueMissing) {
      setFieldBorder(evt.target, 'red');
      evt.target.setCustomValidity('Обязательное поле - передвиньте маркер на карте');
    } else {
      evt.target.setCustomValidity('');
      setFieldBorder(evt.target, 'transparent');
    }
  }

  function syncTime(element, value) {
    element.value = value;
  }

  function syncType(element, value) {
    element.setAttribute('min', value);
  }

  function onTimeInFieldChange(evt) {
    window.syncronizeFields.syncValues(timeOutField, evt.target.value, syncTime);
  }

  function onTimeOutFieldChange(evt) {
    window.syncronizeFields.syncValues(timeInField, evt.target.value, syncTime);
  }

  function onHouseTypeChange(evt) {
    window.syncronizeFields.syncValues(priceField, minPrices[evt.target.value], syncType);
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
  titleField.setAttribute('minlength', titleLengths.min);
  titleField.setAttribute('maxlength', titleLengths.max);
  titleField.setAttribute('required', 'true');
  priceField.setAttribute('required', 'true');
  priceField.setAttribute('min', '0');
  priceField.setAttribute('max', window.data.getMaxPrice());
  priceField.setAttribute('value', window.data.getMinPrice());
  capacity.value = roomNumber.value;
  for (var i = 0; i < capacity.length; i++) {
    capacity.options[i].setAttribute('disabled', 'disabled');
  }

  titleField.addEventListener('invalid', onTitleFieldInvalid);
  priceField.addEventListener('invalid', onPriceFieldInvalid);
  addressField.addEventListener('invalid', onAddressFieldInvalid);
  timeInField.addEventListener('change', onTimeInFieldChange);
  timeOutField.addEventListener('change', onTimeOutFieldChange);
  houseType.addEventListener('change', onHouseTypeChange);
  roomNumber.addEventListener('change', onRoomNumberChange);

  function resetForm() {
    titleField.value = '';
    houseType.value = initValues.type;
    priceField.value = initValues.price;
    timeInField.value = initValues.timein;
    timeOutField.value = initValues.timeout;
    roomNumber.value = initValues.room;
    capacity.value = initValues.capacity;
    for (i = 0; i < features.length; i++) {
      features[i].checked = false;
    }
    description.value = '';
    imageLoad.value = '';
  }

  function onSuccessSubmit(evt) {
    window.backend.save(new FormData(noticeForm), resetForm, window.backend.errorHandler);
    evt.preventDefault();
  }

  noticeForm.addEventListener('submit', onSuccessSubmit);

  window.form = {
    setFormDisabled: function () {
      if (noticeForm.classList.contains('notice__form--disabled') === false) {
        noticeForm.classList.add('notice__form--disabled');
      }
    },
    setFormActive: function () {
      if (noticeForm.classList.contains('notice__form--disabled') === true) {
        noticeForm.classList.remove('notice__form--disabled');
      }
    },
    setFieldsActive: function () {
      formFields.forEach(removeDisabled);
    },
    setFieldsDisabled: function () {
      formFields.forEach(setDisabled);
    },
    address: addressField,
    noticeForm: noticeForm,
    reset: resetForm,
  };
})();
