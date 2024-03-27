// @todo: Функция создания карточки 

// @todo: Функция-колбэк для лайка карточки
// export function onLikeCard(evt, selector) {
//   const eventTarget = evt.target;
//   eventTarget.classList.toggle(selector);
// }

export function createCards(cardTemplate, data, cardData, { onDeleteCard, onPreviewPicture, onLikeCard }, userId) {
  const cardElement = cardTemplate.querySelector(cardData.card).cloneNode(true); //клонировали шаблонный элемент
  const cardImage = cardElement.querySelector(cardData.image);
  const cardLikeButton = cardElement.querySelector(cardData.buttonLike);
  const likesCount = cardElement.querySelector(cardData.likes);
  const cardDeleteButton = cardElement.querySelector(cardData.buttonDelete);
  
  cardImage.src = data.link;
  cardImage.alt = `Место: ${data.name}`;
  cardElement.querySelector(cardData.title).textContent = data.name;

  if (data.owner._id === userId && onDeleteCard) {
    cardDeleteButton.addEventListener('click', () => {
      onDeleteCard(data._id, cardElement);
    });
  } else {
    cardDeleteButton.remove();
  }

  const isLiked = data.likes.some((like) => like._id === userId);
  if (isLiked) {
    cardLikeButton.classList.add(cardData.buttonLikeActive);
  } 

  likesCount.textContent = data.likes.length;

  if (onLikeCard) {
    cardLikeButton.addEventListener('click', () => onLikeCard(data._id, data, userId, cardLikeButton, likesCount));
  }

  cardImage.addEventListener('click', () => onPreviewPicture(data));

  return cardElement;
}