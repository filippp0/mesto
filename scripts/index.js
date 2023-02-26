const editButton = document.querySelector('.profile__edit');
const popup = document.querySelector('.popup');
const closePopup = document.querySelector('.popup__close-icon');

let form = document.querySelector('.popup__container');
let nameUser = document.querySelector('.profile__name');
let jobUser = document.querySelector('.profile__job');
let nameInput = document.querySelector('.popup__user-name');
let jobInput = document.querySelector('.popup__user-job');

nameInput.value = nameUser.textContent;
jobInput.value = jobUser.textContent;

function openPopupEdit() {
  popup.classList.add('popup_opened');
}

editButton.addEventListener('click', openPopupEdit);

function closePopupEdit() {
  popup.classList.remove('popup_opened');
}

closePopup.addEventListener('click', closePopupEdit);

function handleFormSubmit(evt) {
  evt.preventDefault();
  nameUser.textContent = nameInput.value;
  jobUser.textContent = jobInput.value;
  popup.classList.remove('popup_opened');
}

form.addEventListener('submit', handleFormSubmit);
