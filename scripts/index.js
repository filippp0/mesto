const profileEditElement = document.querySelector('.profile__edit');
const profileAddButtonElement = document.querySelector('.profile__add-button')
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

const popupElements = document.querySelectorAll('.popup');
const popupCloseIconElements = document.querySelectorAll('.popup__close-icon');
const profilePopupElement = document.querySelector('.profile-popup')
const cardPopupElement = document.querySelector('.card-popup')
const formPersonalDataElement = profilePopupElement.querySelector('.popup__form');
const formAddCardElement = cardPopupElement.querySelector('.popup__form');
const popupInputTitleElement = formAddCardElement.querySelector('.popup__input_el_title');
const popupInputUrlElement = formAddCardElement.querySelector('.popup__input_el_url');
const popupInputNameElement = document.querySelector('.popup__input_el_name');
const popupInputJobElement = document.querySelector('.popup__input_el_job');
const imagePopupElement = document.querySelector('.image-popup')
const popupImageElement = imagePopupElement.querySelector('.image-popup__image');
const imagePopupCaption = imagePopupElement.querySelector('.image-popup__image-caption');
const imagePopupContainerElement = imagePopupElement.querySelector('.image-popup__container')

const listsElement = document.querySelector('.elements__lists');
const cardElement = document.querySelector('#cardElement').content;

/*массив значений для начальных карточек*/
const initialCards = [{
  name: 'Архыз',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
},
{
  name: 'Челябинская область',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
},
{
  name: 'Иваново',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
},
{
  name: 'Камчатка',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
},
{
  name: 'Холмогорский район',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
},
{
  name: 'Байкал',
  link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
}
];

/*функция открытия попап*/
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

/*функция закрытия попап*/
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/*функция отмены закрытия попап при нажатии на дочерних*/
function closePopupByClickOnOverlay(evt, popup) {
  if (evt.target === evt.currentTarget) {
    closePopup(popup);
  }
  return
}

/*функция открытия попап для картинки*/
function openedImagePopup(src, title) {
  popupImageElement.src = src;
  popupImageElement.alt = title;
  imagePopupCaption.textContent = title;
  openPopup(imagePopupElement);
}

/*функция добавления разметки карточки (картинки и описания)*/
function addCard(object) {
  const listElement = cardElement.querySelector('.elements__list').cloneNode(true);
  const imageElement = listElement.querySelector('.elements__image');
  const trashElement = listElement.querySelector('.elements__trash');
  const likeIconElement = listElement.querySelector('.elements__like-icon');
  imageElement.src = object.link;
  imageElement.alt = object.name;
  listElement.querySelector('.elements__subtitle').textContent = object.name;
  imageElement.addEventListener('click', () => openedImagePopup(object.link, object.name));
  likeIconElement.addEventListener('click', () => likeIconElement.classList.toggle('elements__like-icon_active'));
  trashElement.addEventListener('click', () => trashElement.closest('.elements__list').remove());
  return listElement;
}

/*создани при загрузке страницы начальных карточек*/
initialCards.forEach(element => {
  const card = addCard(element);
  listsElement.append(card);
})

/*открытие попап редоктирования профиля*/
profileEditElement.addEventListener('click', () => {
  openPopup(profilePopupElement);
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputJobElement.value = profileJobElement.textContent;
})

/*обработка submit для формы редактирования профиля*/
formPersonalDataElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileNameElement.textContent = popupInputNameElement.value;
  profileJobElement.textContent = popupInputJobElement.value;
  closePopup(profilePopupElement);
})

/*открытие попап редоктирования карточек*/
profileAddButtonElement.addEventListener('click', () => {
  openPopup(cardPopupElement);
  popupInputTitleElement.value = '';
  popupInputUrlElement.value = '';
})

/*обработка submit формы для добавления карточки*/
formAddCardElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  const objectNameUrl = {name: popupInputTitleElement.value, link: popupInputUrlElement.value};
  const card = addCard(objectNameUrl);
  listsElement.prepend(card);
  closePopup(cardPopupElement);
})

/*закрытие попап при нажатии на крестик*/
popupCloseIconElements.forEach(element => {
  const popup = element.closest('.popup');
  element.addEventListener('click', () => closePopup(popup));
})

/*закрытие попап при нажатии на фон*/
popupElements.forEach(element => element.addEventListener('click', (evt) => closePopupByClickOnOverlay(evt, element)));
