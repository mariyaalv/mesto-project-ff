
const showInputError = (form, input, errorMessage, config) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add(config.inputErrorClass);
  error.textContent = errorMessage;
  error.classList.add(config.errorClass);
};

const hideInputError = (form, input, config) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove(config.inputErrorClass);
  error.classList.remove(config.errorClass);
  error.textContent = '';
};

const checkInputValidity = (form, input, config) => {
  if (input.validity.patternMismatch) {
    input.setCustomValidity(input.dataset.errorMessage);
  } else {
    input.setCustomValidity("");
  }

  if (!input.validity.valid) {
    showInputError(form, input, input.validationMessage, config);
  } else {
    hideInputError(form, input, config);
  }
};

//Есть ли здесь хотя бы одно поле, которое не прошло валидацию?
const hasInvalidInput = (inputList) => {
  return inputList.some((input) => {
    return !input.validity.valid;
  })
}

//функция, которая отвечает за блокировку кнопки
const toggleButtonState = (inputList, button, config) => {
  if(hasInvalidInput(inputList)) {
    button.disabled = true;
    button.classList.add(config.inactiveButtonClass);
  } else {
    button.disabled = false; 
    button.classList.remove(config.inactiveButtonClass);
  }
}

const setEventListeners = (form, config) => {
  const inputList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);
  // чтобы проверить состояние кнопки в самом начале
  toggleButtonState(inputList, button, config);

  inputList.forEach((input) => {
    input.addEventListener('input', function () {
      checkInputValidity(form, input, config);
      // чтобы проверять его при изменении любого из полей
      toggleButtonState(inputList, button, config);
    });
  });
};

//функция ответственна за включение валидации всех форм
export const enableValidation = (config) => {
  const formList = Array.from(document.querySelectorAll(config.formSelector));
  formList.forEach((form) => {
    setEventListeners(form, config);
  });
}

export const clearValidation = (profileForm, config) => {
  const inputList = Array.from(profileForm.querySelectorAll(config.inputSelector));
  const button = profileForm.querySelector(config.submitButtonSelector);
  toggleButtonState(inputList, button, config);
  inputList.forEach((input) => {
    hideInputError(profileForm, input, config);
  })
}