import "./pages/index.css";
import { createCards } from "./components/card";
import { openModal, closeModal } from "./components/modal.js";
import { enableValidation, clearValidation } from "./components/validation.js";
import {
  getCardList,
  getUserInfo,
  setUserInfo,
  addNewCard,
  setUserAvatar,
  removeCard,
  likeCardsStatus,
  dislikeCardsStatus,
} from "./components/api.js";

//объект с настройками валидации
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

const cardData = {
  //вынесли данные карточки в объект
  card: ".places__item",
  image: ".card__image",
  title: ".card__title",
  likes: ".card__like-count",
  buttonLike: ".card__like-button",
  buttonLikeActive: "card__like-button_is-active",
  buttonDelete: ".card__delete-button",
};

const cardTmp = document.querySelector("#card-template").content; //получили доступ к содержимому
const placesList = document.querySelector(".places__list"); //место, куда будут добавлены карточки

const buttonAdd = document.querySelector(".profile__add-button");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonsClose = document.querySelectorAll(".popup__close");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_new-card");
const popupAvatar = document.querySelector(".popup_type_avatar");


const popupImage = document.querySelector(".popup_type_image");
const picturePopupImage = popupImage.querySelector(".popup__image");
const captionPopupImage = popupImage.querySelector(".popup__caption");

const formEditCard = document.forms["edit-profile"];
const nameInput = formEditCard.querySelector(".popup__input_type_name");
const jobInput = formEditCard.querySelector(".popup__input_type_description");

const profileName = document.querySelector(".profile__title");
const profileJob = document.querySelector(".profile__description");
const profileAvatar = document.querySelector(".profile__image");

const formNewCard = document.forms["new-place"];
const namePlaceInput = formNewCard.querySelector(
  ".popup__input_type_card-name"
);
const urlPlaceInput = formNewCard.querySelector(".popup__input_type_url");

const formAvatarCard = document.forms["user-avatar"];
const linkAvatarInput = formAvatarCard.querySelector(".popup__input_type_url");

// @todo: функция добавления карточек вынесена отдельно
function addCard(place, cards) {
  place.append(cards);
}

buttonEdit.addEventListener("click", function () {
  clearValidation(formEditCard, validationConfig);
  nameInput.value = profileName.textContent; //перед открытием заполняем поля актуальными данными
  jobInput.value = profileJob.textContent;
  openModal(popupEdit);
});

buttonAdd.addEventListener("click", function () {
  openModal(popupAdd);
});

profileAvatar.addEventListener("click", function () {
  clearValidation(formAvatarCard, validationConfig);
  openModal(popupAvatar);
});

// @todo: функция-обработчик закрытия по крестику и события клика по оверлею
buttonsClose.forEach((btn) => {
  const popup = btn.closest(".popup");
  btn.addEventListener("click", () => closeModal(popup));
  popup.addEventListener("mousedown", (evt) => {
    if (evt.target.classList.contains("popup")) {
      closeModal(popup);
    }
  });
});

// @todo: Функция для просмотра карточки
const handlePreviewPicture = ({ link, name }) => {
  picturePopupImage.src = link;
  picturePopupImage.alt = name;
  captionPopupImage.textContent = name;
  openModal(popupImage);
};

// @todo: Функция для удаления карточки
const handleDeleteCard = (cardId, cardElement) => {
  removeCard(cardId)
    .then(() => {
      cardElement.remove();
    })
    .catch((err) => {
      console.log(err);
    });
};

// @todo: Функция для лайка карточки
const handleLikeCard = (cardId, card, userId, cardLikeButton, likesCount) => {
  likesCount.textContent = card.likes.length;
  const isLiked = card.likes.some((like) => like._id === userId);
  if (isLiked) {
    dislikeCardsStatus(cardId)
      .then((data) => {
        cardLikeButton.classList.remove(cardData.buttonLikeActive);
        likesCount.textContent = data.likes.length;
        card.likes = data.likes;
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    likeCardsStatus(cardId)
      .then((data) => {
        cardLikeButton.classList.add(cardData.buttonLikeActive);
        likesCount.textContent = data.likes.length;
        card.likes = data.likes;
      })
      .catch((err) => {
        console.log(err);
      });
  }
};

// Обработчик редактирование профиля
function handleFormSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  setUserInfo({ name: nameInput.value, about: jobInput.value })
    .then((data) => {
      profileName.textContent = data.name;
      profileJob.textContent = data.about;
      closeModal(popupEdit);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    })
}

// Прикрепляем обработчик к форме:
formEditCard.addEventListener("submit", handleFormSubmit);

// Обработчик добавления карточки
function addNewCardSubmit(evt) {
  evt.preventDefault();
  renderLoading(true, evt);
  addNewCard({ name: namePlaceInput.value, link: urlPlaceInput.value })
    .then((data) => {
      placesList.prepend(
        createCards(
          cardTmp,
          data,
          cardData,
          {
            onDeleteCard: handleDeleteCard,
            onPreviewPicture: handlePreviewPicture,
            onLikeCard: handleLikeCard,
          },
          data.owner._id
        )
      );
      closeModal(popupAdd);
      formNewCard.reset();
      clearValidation(formNewCard, validationConfig);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    })
}

formNewCard.addEventListener("submit", addNewCardSubmit);

// Обработчик загрузки аватарки
const addNewAvatar = (evt) => {
  evt.preventDefault();
  renderLoading(true, evt);
  setUserAvatar({ avatar: linkAvatarInput.value })
    .then((data) => {
      profileAvatar.style.backgroundImage = `url(${data.avatar})`;
      closeModal(popupAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      renderLoading(false, evt);
    })
}

formAvatarCard.addEventListener("submit", addNewAvatar);

//валидация
enableValidation(validationConfig);

//API
Promise.all([getCardList(), getUserInfo()])
  .then(([cards, userData]) => {
    const userId = userData._id;
    profileName.textContent = userData.name;
    profileJob.textContent = userData.about;
    profileAvatar.style.backgroundImage = `url(${userData.avatar})`;
    cards.forEach((data) => {
      addCard(
        placesList,
        createCards(
          cardTmp,
          data,
          cardData,
          {
            onDeleteCard: handleDeleteCard,
            onPreviewPicture: handlePreviewPicture,
            onLikeCard: handleLikeCard,
          },
          userId
        )
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });

const renderLoading = (isLoading, evt) => {
  const button = evt.submitter;
  if(isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = "Сохранить";
    button.disabled = false;
  }
}