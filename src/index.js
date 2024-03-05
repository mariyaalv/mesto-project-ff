import './pages/index.css';
import {initialCards} from './components/cards.js';
import {createCards, deleteCards, likeCards, addCard} from './components/card';
import {openModal, closeModal} from './components/modal.js';

const cardTmp = document.querySelector('#card-template').content; //получили доступ к содержимому

const placesList = document.querySelector('.places__list');  //место, куда будут добавлены карточки
const cardData = { //вынесли данные карточки в объект
  card: '.places__item',
  image: '.card__image',
  title: '.card__title',
  buttonLike: '.card__like-button',
  buttonLikeActive: 'card__like-button_is-active',
  buttonDelete: '.card__delete-button'
};

const buttonAdd = document.querySelector('.profile__add-button');
const buttonEdit = document.querySelector('.profile__edit-button');

const buttonClose = document.querySelectorAll('.popup__close');
const buttonOverlay = document.querySelectorAll('.popup');

const popupEdit = document.querySelector('.popup_type_edit');
const popupAdd = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');
const picturePopupImage = popupImage.querySelector('.popup__image');


//для каждого элемента из массива initialCards должна запуститься функция
initialCards.forEach((element) => {
  addCard(placesList, createCards(cardTmp, element, cardData, deleteCards, likeCards, openImage));
});

//для каждого элемента из псевдомассива кнопок должна запуститься функция
buttonEdit.addEventListener('click', function() {
  openModal(popupEdit);
});

buttonAdd.addEventListener('click', function() {
  openModal(popupAdd);
});

buttonClose.forEach( (element) => {
  element.addEventListener('click', closeModal);
});

// @todo: Функция-колбэк для просмотра карточки
function openImage(evt) {
  const eventTarget = evt.target;
  picturePopupImage.src = eventTarget.src;
  picturePopupImage.link = eventTarget.link;
  openModal(popupImage);
}