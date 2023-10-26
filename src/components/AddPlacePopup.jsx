import {useEffect, useState} from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({ isOpen, onClose, onAddCard }) {
    const [placeName, setPlaceName] = useState("");
    const [placeLink, setPlaceLink] = useState("");

    function handleChangePlaceName(evt) {
        setPlaceName(evt.target.value);
    }

    function handleChangePlaceLink(evt) {
        setPlaceLink(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onAddCard({
            name: placeName,
            link: placeLink,
        });
    }

    useEffect(() => {
        setPlaceName("");
        setPlaceLink("");
    }, [isOpen]);

    return (
        <PopupWithForm isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} name="new-card" title="Новое место">
            <input value={placeName} onChange={handleChangePlaceName} name="placeName" className="popup__form-field" id="field-name-place" required minLength="2" maxLength="30" placeholder="Название" type="text" />
            <span className="field-name-place-error popup__form-error"></span>
            <input value={placeLink} onChange={handleChangePlaceLink} name="placeLink" className="popup__form-field" id="popup__placeLink-input" required placeholder="Ссылка на картинку" type="url" autoComplete="off" />
            <span className="field-link-place-error popup__form-error"></span>
        </PopupWithForm>
    );
}

export default AddPlacePopup;
