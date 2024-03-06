import "./pages/index.css";
import { initialCards } from "./components/cards.js";
import {
  createCards,
  deleteCards,
  likeCards,
} from "./components/card";
import { openModal, closeModal } from "./components/modal.js";

const cardTmp = document.querySelector("#card-template").content; //получили доступ к содержимому
const placesList = document.querySelector(".places__list"); //место, куда будут добавлены карточки
const cardData = {
  //вынесли данные карточки в объект
  card: ".places__item",
  image: ".card__image",
  title: ".card__title",
  buttonLike: ".card__like-button",
  buttonLikeActive: "card__like-button_is-active",
  buttonDelete: ".card__delete-button",
};

const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonsClose = document.querySelectorAll(".popup__close");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupImage = document.querySelector(".popup_type_image");
const picturePopupImage = popupImage.querySelector(".popup__image");
const captionPopupImage = popupImage.querySelector(".popup__caption");
const buttonsOverlay = document.querySelectorAll(".popup");

const formEditCard = document.forms['edit-profile'];
const nameInput = formEditCard.querySelector(".popup__input_type_name");
const jobInput = formEditCard.querySelector(".popup__input_type_description");
const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");

const formNewCard = document.forms['new-place'];
const namePlaceInput = formNewCard.querySelector(".popup__input_type_card-name");
const urlPlaceInput = formNewCard.querySelector(".popup__input_type_url");

// @todo: функция добавления карточек вынесена отдельно
function addCard(place, cards) {
  place.append(cards);
}

// @todo: функция-обработчик события клика по оверлею
buttonsOverlay.forEach((element) => {
  element.addEventListener("click", (evt) => {
    if(evt.target === evt.currentTarget) {
      closeModal(element);
    }
  });
});

//для каждого элемента из массива initialCards должна запуститься функция
initialCards.forEach((element) => {
  addCard(
    placesList,
    createCards(cardTmp, element, cardData, deleteCards, likeCards, openImage)
  );
});

buttonEdit.addEventListener("click", function () {
  nameInput.value = profileName.textContent; //перед открытием заполняем поля актуальными данными
  jobInput.value = profileJob.textContent;
  openModal(popupEdit);
});

buttonAdd.addEventListener("click", function () {
  openModal(popupAdd);
});

buttonsClose.forEach((element) => {
  element.addEventListener("click", function () {
    closeModal(element.closest(".popup"));
  });
});

// @todo: Функция-колбэк для просмотра карточки
function openImage(link, name) {
  picturePopupImage.src = link;
  picturePopupImage.alt = name;
  captionPopupImage.textContent = name;
  openModal(popupImage);
}

// Обработчик «отправки» формы (пока она никуда отправляться не будет)
function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileName.textContent = nameInput.value;
  profileJob.textContent = jobInput.value;
  closeModal(popupEdit);
}

// Прикрепляем обработчик к форме:
formEditCard.addEventListener("submit", handleFormSubmit);

// Обработчик добавления карточки
function addNewCardSubmit(evt) {
  evt.preventDefault();
  const cardNewData = {
    name: namePlaceInput.value,
    link: urlPlaceInput.value,
  };
  placesList.prepend(
    createCards(
      cardTmp,
      cardNewData,
      cardData,
      deleteCards,
      likeCards,
      openImage
    )
  );
  closeModal(popupAdd);
  formNewCard.reset();
}

formNewCard.addEventListener("submit", addNewCardSubmit);
