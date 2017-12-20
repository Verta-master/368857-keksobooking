'use strict';

// работа с формой
(function () {
  var CHILDREN_NUMBER = 1;
  var Price = {
    MIN: 1E3,
    MAX: 1E6
  };
  var TitleLength = {
    MIN: 30,
    MAX: 100
  };
  var InitialValue = {
    TYPE: 'bungalo',
    PRICE: 1000,
    TIMEIN: '12:00',
    TIMEOUT: '12:00',
    ROOM: 1,
    CAPACITY: 1
  };
  var RoomToGuest = {
    1: ['1'],
    2: ['1', '2'],
    3: ['1', '2', '3'],
    100: ['0']
  };
  var minPrices = {
    bungalo: 0,
    flat: 1000,
    house: 5000,
    palace: 10000
  };
  var ROOM_PALACE = '100';
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
  var uploadZone = noticeForm.querySelector('.form__photo-container');

  function setFieldBorder(field, color) {
    field.style.borderColor = color;
  }

  function removeDisabled(item) {
    item.removeAttribute('disabled');
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
      setFieldBorder(evt.target, '#d9d9d3');
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
      setFieldBorder(evt.target, '#d9d9d3');
    }
  }

  function syncTime(element, value) {
    element.value = value;
  }

  function syncType(element, value) {
    element.setAttribute('min', value);
  }

  function onTimeInFieldChange(evt) {
    window.syncronizeFields(timeOutField, evt.target.value, syncTime);
  }

  function onTimeOutFieldChange(evt) {
    window.syncronizeFields(timeInField, evt.target.value, syncTime);
  }

  function onHouseTypeChange(evt) {
    window.syncronizeFields(priceField, minPrices[evt.target.value], syncType);
  }

  function onRoomNumberChange() {
    capacity.value = (roomNumber.value !== ROOM_PALACE) ? roomNumber.value : 0;
    var guests = RoomToGuest[roomNumber.value];
    [].forEach.call(capacity.options, function (item) {
      if (guests.includes(item.value)) {
        item.removeAttribute('disabled');
      } else {
        item.setAttribute('disabled', 'disabled');
      }
    });
  }

  noticeForm.setAttribute('action', 'https://js.dump.academy/keksobooking');
  addressField.setAttribute('required', 'true');
  addressField.setAttribute('readonly', 'true');
  titleField.setAttribute('minlength', TitleLength.MIN);
  titleField.setAttribute('maxlength', TitleLength.MAX);
  titleField.setAttribute('required', 'true');
  priceField.setAttribute('required', 'true');
  priceField.setAttribute('min', '0');
  priceField.setAttribute('max', Price.MAX);
  priceField.setAttribute('value', Price.MIN);
  capacity.value = roomNumber.value;

  titleField.addEventListener('invalid', onTitleFieldInvalid);
  priceField.addEventListener('invalid', onPriceFieldInvalid);
  timeInField.addEventListener('change', onTimeInFieldChange);
  timeOutField.addEventListener('change', onTimeOutFieldChange);
  houseType.addEventListener('change', onHouseTypeChange);
  roomNumber.addEventListener('change', onRoomNumberChange);

  function uncheck(item) {
    item.checked = false;
  }

  function disableOnRequest(item, index) {
    item.disabled = (index !== 2) ? true : false;
  }

  function resetForm() {
    titleField.value = '';
    houseType.value = InitialValue.TYPE;
    priceField.value = InitialValue.PRICE;
    timeInField.value = InitialValue.TIMEIN;
    timeOutField.value = InitialValue.TIMEOUT;
    roomNumber.value = InitialValue.ROOM;
    capacity.value = InitialValue.CAPACITY;
    [].forEach.call(capacity, disableOnRequest);
    [].forEach.call(features, uncheck);
    description.value = '';
    imageLoad.value = '';
    // удаление узлов выполняется, ориентируясь на порядок размещения в верстке
    while (uploadZone.childElementCount > CHILDREN_NUMBER) {
      uploadZone.removeChild(uploadZone.lastChild);
    }
  }

  function onSuccessSubmit(evt) {
    window.backend.save(new FormData(noticeForm), resetForm, window.backend.errorHandler);
    evt.preventDefault();
  }

  noticeForm.addEventListener('submit', onSuccessSubmit);

  window.form = {
    setInitialState: function (x, y, shift) {
      [].forEach.call(formFields, setDisabled);
      resetForm();
      this.setAddress(x, y, shift);
    },
    setActive: function () {
      noticeForm.classList.remove('notice__form--disabled');
      [].forEach.call(formFields, removeDisabled);
    },
    setAddress: function (x, y, shift) {
      addressField.value = 'x: ' + x + ', y: ' + window.shift.getMainPinY(y, shift);
    }
  };
})();
