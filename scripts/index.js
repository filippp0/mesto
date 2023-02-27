let profileEdit = document.querySelector('.profile__edit');
let profileName = document.querySelector('.profile__name');
let profileJob = document.querySelector('.profile__job');
let popup = document.querySelector('.popup');
let popupCloseIcon = document.querySelector('.popup__close-icon');
let popupForm = document.querySelector('.popup__form');
let popupInputName = popupForm.querySelector('.popup__input_el_name');
let popupInputJob = popupForm.querySelector('.popup__input_el_job');
let popupSubmit = popupForm.querySelector('.popup__submit');

profileEdit.addEventListener('click', () => {
  popup.classList.add('popup_opened');
  popupInputName.value = profileName.textContent;
  popupInputJob.value = profileJob.textContent;
});

function closePopup() {
  popup.classList.remove('popup_opened');
}

popupCloseIcon.addEventListener('click', closePopup);

popupForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  profileName.textContent = popupInputName.value;
  profileJob.textContent = popupInputJob.value;
  closePopup();
});
