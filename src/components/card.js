// @todo: Функция создания карточки 
export function createCards(item, imageData, cardData, deleteFunction, likeFunction, openPopupCard) { // функция принимает в аргументах данные одной карточки
  const cardElement = item.querySelector(cardData.card).cloneNode(true); //клонировали шаблонный элемент
//наполняем содержимым
  const cardImage = cardElement.querySelector(cardData.image);
  cardImage.src = imageData.link;
  cardImage.alt = `Место: ${imageData.name}`;
  cardElement.querySelector(cardData.title).textContent = imageData.name;

  const cardDeleteButton = cardElement.querySelector(cardData.buttonDelete); //нашли кнопку удаления
  cardDeleteButton.addEventListener('click', evt => deleteFunction(evt, cardData.card)); //функция-обработчик клика по иконке => будет вызван переданный в аргументах колбэк

  const cardLikeButton = cardElement.querySelector(cardData.buttonLike);
  cardLikeButton.addEventListener('click', evt => likeFunction(evt, cardData.buttonLikeActive));

  cardImage.addEventListener('click', openPopupCard);

  return cardElement; //возвращаем готовые объект карточки
}

// @todo: Функция-колбэк для удаления карточки
export function deleteCards(evt, selector) {
  const eventTarget = evt.target.closest(selector);
  eventTarget.setAttribute('disabled', true);
  eventTarget.remove();
}

// @todo: Функция-колбэк для лайка карточки
export function likeCards(evt, selector) {
  const eventTarget = evt.target;
  eventTarget.classList.toggle(selector);
}

// @todo: функция добавления карточек вынесена отдельно
export function addCard(place, cards) {
  place.append(cards);
}

