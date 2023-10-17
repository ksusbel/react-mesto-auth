export const initialCards = [
    {
        name: "Архыз",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
    },
    {
        name: "Челябинская область",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
    },
    {
        name: "Иваново",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
    },
    {
        name: "Камчатка",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
    },
    {
        name: "Холмогорский район",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
    },
    {
        name: "Байкал",
        link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
    },
];

export const config = {
    // Объявили объект настроек валидации
    formSelector: ".popup__form",
    inputSelector: ".popup__form-field",
    submitButtonSelector: ".popup__form-save",
    inactiveButtonClass: "popup__form-save_disabled",
    inputErrorClass: "popup__form-field_invalid",
};

export const popupMods = document.querySelectorAll(".popup");
export const imgPopup = document.querySelector("#popup_full_img");
export const imgFull = document.querySelector(".popup__img-full");
export const imgTitle = document.querySelector(".popup__img-title");
export const namePlaceInput = document.querySelector("#field-name-place");
export const linkPlaceInput = document.querySelector("#field-link-place");
// форма Редактировать профиль
export const editButton = document.querySelector(".profile__edit-button");
export const editAvatar = document.querySelector(".profile__avatar-edit-button");
export const editPopup = document.querySelector("#popup_edit_prof");


// Находим поля формы в DOM
export const nameInput = document.querySelector("#field-name");
export const jobInput = document.querySelector("#field-job");
export const avatarInput = document.querySelector("#field-avatar-link");
// Выберите элементы, куда должны быть вставлены значения полей
export const profileName = document.querySelector(".profile__name");
export const profileJob = document.querySelector(".profile__description");
// форма Добавить карточку
export const addButton = document.querySelector(".profile__add-button");
export const addPopup = document.querySelector("#popup_add_card");
