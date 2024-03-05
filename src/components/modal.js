// функции управления модальными окнами содержат только код открытия или закрытия, в них нет кода для заполнения формы профиля или очистки формы добавления карточки.
// @todo: функция открытия модального окна
export function openModal (popupElement) {
  popupElement.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeByEsc);
}

// @todo: функция закрытия модального окна
export function closeModal (popupElement) {
  popupElement.classList.remove('popup_is-opened');
  document.removeEventListener('click', closeByEsc);
  // document.addEventListener('click', closeByOverlay);
}

// export function closeByButton (evt) {

// }

// @todo: функция-обработчик события нажатия Esc = обработчик события должен добавляться при открытии окна и удаляться после закрытия.
function closeByEsc (evt) {
  if(evt.key === 'Escape') {
    closeModal(document.querySelector('.popup_is-opened'));
  }
}

// @todo: функция-обработчик события клика по оверлею
// function closeByOverlay (evt) {
//   
//     closeModal(document.querySelector('.popup_is-opened'));
// }



// @todo: Реализовано поведение модальных окон:
// при клике по крестику в правом верхнем углу модальное окно закрывается;
// при клике по оверлею модальное окно закрывается, при этом нажатие внутри модального окна не приводит к закрытию;
// при нажатии клавиши Esc модальное окно закрывается;
// модальное окно открывается и закрывается плавно.

// @todo: Корректно работает добавление новых карточек:
// при нажатии на кнопку «+» открывается модальное окно добавления карточки;
// при нажатии на кнопку «Сохранить» в начало списка карточек добавляется новая с введенными в форму данными;
// после добавления карточки модальное окно закрывается и форма очищается.

// @todo: Корректно работает редактирование профиля:
// при нажатии на кнопку редактирования открывается модальное окно редактирования профиля;
// при открытии модального окна редактирования профиля в поля формы подставляются данные пользователя со страницы;
// при нажатии кнопки «Сохранить» модальное окно закрывается, а данные из полей формы подставляются на страницу;
// если модальное окно редактирования профиля закрывается, то введённые в поля формы данные не сохраняются.