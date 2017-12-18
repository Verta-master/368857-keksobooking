'use strict';

// работа с формой
(function () {
  var Price = {
    MIN: 1E3,
    MAX: 1E6
  };
  var MinPrice = {
    BUNGALO: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000
  };
  var TitleLength = {
    MIN: 30,
    MAX: 100
  };
  var InitialValue = {
    TYPE: 'flat',
    PRICE: 1000,
    TIMEIN: '12:00',
    TIMEOUT: '12:00',
    ROOM: 1,
    CAPACITY: 1
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
    window.syncronizeFields.syncValues(priceField, MinPrice[evt.target.value], syncType);
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

  function resetForm() {
    titleField.value = '';
    houseType.value = InitialValue.TYPE;
    priceField.value = InitialValue.PRICE;
    timeInField.value = InitialValue.TIMEIN;
    timeOutField.value = InitialValue.TIMEOUT;
    roomNumber.value = InitialValue.ROOM;
    capacity.value = InitialValue.CAPACITY;
    for (var k = 0; k < capacity.length; k++) {
      if (k !== 2) {
        capacity[k].disabled = true;
      }
    }
    for (k = 0; k < features.length; k++) {
      features[k].checked = false;
    }
    description.value = '';
    imageLoad.value = '';
    while (uploadZone.childElementCount > 1) {
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
      if (noticeForm.classList.contains('notice__form--disabled') === false) {
        noticeForm.classList.add('notice__form--disabled');
      }
      [].forEach.call(formFields, setDisabled);
      resetForm();
      this.setAddress(x, y, shift);
    },
    setActive: function () {
      if (noticeForm.classList.contains('notice__form--disabled')) {
        noticeForm.classList.remove('notice__form--disabled');
      }
    },
    setFieldsActive: function () {
      [].forEach.call(formFields, removeDisabled);
    },
    setAddress: function (x, y, shift) {
      addressField.value = 'x: ' + x + ', y: ' + window.shift.getMainPinY(y, shift);
    }
  };
})();
