// @todo: Темплейт карточки
const cardTmp = document.querySelector('#card-template').content; //получили доступ к содержимому

// @todo: DOM узлы
const cardTmpItem = cardTmp.querySelector('.places__item'); //шаблонный элемент
const placesList = document.querySelector('.places__list');//место, куда будут добавлены карточки

// @todo: Функция-колбэк для удаления карточки
function deleteCards(evt) {
  const eventTarget = evt.target.closest('.places__item');
  eventTarget.setAttribute('disabled', true);
  eventTarget.remove();
}

// @todo: Функция создания карточки 
function createCards(link, description) { // функция принимает в аргументах данные одной карточки
  const cardElement = cardTmpItem.cloneNode(true); //клонировали элемент
//наполняем содержимым
  const cardImage = cardElement.querySelector('.card__image');
  cardImage.src = link;
  cardImage.alt = `Место: ${description}`;
  cardElement.querySelector('.card__title').textContent = description;

  const cardDeleteButton = cardElement.querySelector('.card__delete-button'); //нашли кнопку удаления
  cardDeleteButton.addEventListener('click', deleteCards); //функция-обработчик клика по иконке => будет вызван переданный в аргументах колбэк

  return cardElement; //возвращаем готовые объект карточки
}

//для каждого элемента из массива initialCards должна запуститься функция
initialCards.forEach((element) => {
  placesList.append(createCards(element.link, element.name)); //передаем картинки и названия и производим вставку на страницу
});
