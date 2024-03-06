// @todo: функция открытия модального окна
export function openModal (popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

// @todo: функция закрытия модального окна
export function closeModal (popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('click', closeByEsc);
}

// @todo: функция-обработчик события нажатия Esc
function closeByEsc (evt) {
  if(evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}