let editButton = document.querySelector(".profile__edit");

let popup = document.querySelector(".popup");

let closePopup = document.querySelector(".popup__close-icon");

let form = document.querySelector(".popup__container");

let nameUser = document.querySelector(".profile__name");

let jobUser = document.querySelector(".profile__job");

let nameInput = document.querySelector(".popup__user-name");

let jobInput = document.querySelector(".popup__user-job");

nameInput.value = nameUser.textContent;

jobInput.value = jobUser.textContent;

editButton.addEventListener("click", () => popup.classList.add("popup_opened"));

closePopup.addEventListener("click", () => popup.classList.remove("popup_opened"));

form.addEventListener("submit", (evt) => {
    evt.preventDefault();
    nameUser.textContent = nameInput.value;
    jobUser.textContent = jobInput.value;
    popup.classList.remove("popup_opened");
});
