const profileEditElement = document.querySelector('.profile__edit');
const profileAddButtonElement = document.querySelector('.profile__add-button')
const profileNameElement = document.querySelector('.profile__name');
const profileJobElement = document.querySelector('.profile__job');

const popupElements = document.querySelectorAll('.popup');
const profilePopupElement = document.querySelector('.profile-popup')
const cardPopupElement = document.querySelector('.card-popup')
const imagePopupElement = document.querySelector('.image-popup')
const imagePopupContainerElement = imagePopupElement.querySelector('.image-popup__container')
const popupCloseIconElements = document.querySelectorAll('.popup__close-icon');
const personalDataElement = profilePopupElement.querySelector('.popup__form')
const addCardElement = cardPopupElement.querySelector('.popup__form')
const popupInputNameElement = document.querySelector('.popup__input_el_name');
const popupInputJobElement = document.querySelector('.popup__input_el_job');

const ListsElement = document.querySelector('.elements__lists');
const elementsLikeIconElements = document.querySelectorAll('.elements__like-icon');
const TrashElements = document.querySelectorAll('.elements__trash');

/*открытие попап редоктирования профиля*/
profileEditElement.addEventListener('click', () => {
  profilePopupElement.classList.add('popup_opened');
  popupInputNameElement.value = profileNameElement.textContent;
  popupInputJobElement.value = profileJobElement.textContent;
});

/*функция закрытия попап*/
function closePopup() {
  popupElements.forEach(element => {
    if (element.classList.contains('popup_opened')) {
      element.classList.remove('popup_opened');
    }
  })
}
/*отмены закрытия попап при нажатии на дочерних*/
function closePopupByClickOnOverlay (evt) {
  if (evt.target === evt.currentTarget) {
    console.log('клик по оверлэй')
    closePopup()
  }
  console.log('клик не по оверлэй')
  return
}

/*закрытие попап при нажатии на фон*/
popupElements.forEach(element => element.addEventListener('click', closePopupByClickOnOverlay));

/*закрытие попап при нажатии на крестик*/
popupCloseIconElements.forEach(element => element.addEventListener('click', closePopup));

/*обработка submit для формы редактирования профиля*/
personalDataElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileNameElement.textContent = popupInputNameElement.value;
  profileJobElement.textContent = popupInputJobElement.value;
  closePopup();
});

/*открытие попап редоктирования карточек*/
profileAddButtonElement.addEventListener('click', () => {
  cardPopupElement.classList.add('popup_opened');
  addCardElement.querySelector('.popup__input_el_title').value = '';
  addCardElement.querySelector('.popup__input_el_url').value = '';
});

/*активация для лайка фактических картинок*/
elementsLikeIconElements.forEach(element => {
  element.addEventListener('click', evt =>
  evt.target.classList.toggle('elements__like-icon_active'))
})

/*удаление элемента галлереи фактических карточек*/
TrashElements.forEach(element => {
  const elementsListElement = element.closest('.elements__list');
  element.addEventListener('click', () => elementsListElement.remove());
})

/*функция добавления карточки (картинки и описания)*/
function addCard(valueTitle, valueUrl) {
  const cardElement = document.querySelector('#cardElement').content;
  const listElement = cardElement.querySelector('.elements__list').cloneNode(true);
  listElement.querySelector('.elements__image').src = valueUrl;
  listElement.querySelector('.elements__image').alt = valueTitle;
  listElement.querySelector('.elements__subtitle').textContent = valueTitle;
  listElement.querySelector('.elements__like-icon').addEventListener('click', evt => evt.target.classList.toggle('elements__like-icon_active'));
  listElement.querySelector('.elements__trash').addEventListener('click', () => listElement.querySelector('.elements__trash').closest('.elements__list').remove());
  ListsElement.prepend(listElement);
  OpenedImagePopup()
}

/*обработка submit для формы для добавления картинки*/
addCardElement.addEventListener('submit', (evt) => {
  evt.preventDefault();
  addCard(addCardElement.querySelector('.popup__input_el_title').value, addCardElement.querySelector('.popup__input_el_url').value);
  const listElements = document.querySelectorAll('.elements__list');
  if (listElements.length > 6) {
    ListsElement.lastElementChild.remove();
  }
  closePopup();
});

/*фунция получения разметки картинки, назначение заголовка и пути*/
function creatImage(imageScr, textContentCaption) {
  const fullSizeImage = document.querySelector('#fullSizeImage').content;
  const popupImageContainerElement = fullSizeImage.querySelector('.image-popup__image-container').cloneNode(true);
  const popupImageElement = popupImageContainerElement.querySelector('.image-popup__image');
  const popupImageCaptionElement = popupImageContainerElement.querySelector('.image-popup__image-caption');
  popupImageElement.src = imageScr;
  popupImageElement.alt = textContentCaption;
  popupImageCaptionElement.textContent = textContentCaption;
  imagePopupContainerElement.append(popupImageContainerElement);
}

/*Функция открытия попап с контейнером для картинки по клику на картинку*/
function OpenedImagePopup() {
  const imageElements = document.querySelectorAll('.elements__image');
  const SubtitleElements = document.querySelectorAll('.elements__subtitle')
  for (let i = 0; i < imageElements.length; i++) {
    imageElements[i].addEventListener('click', () => {
      if (document.querySelector('.image-popup__image-container')) {
        document.querySelector('.image-popup__image-container').remove();
      }
      creatImage (imageElements[i].src, SubtitleElements[i].textContent)
      imagePopupElement.classList.add('popup_opened');
    })
  }
}
OpenedImagePopup()
