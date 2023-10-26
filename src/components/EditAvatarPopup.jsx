import { useRef } from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {
    const avatarRef = useRef();

    function handleSubmit(e) {
        e.preventDefault();

        onUpdateAvatar({
            avatar: avatarRef.current.value,
        });
    }

    return (
        <PopupWithForm name="avatar" title="Обновить аватар" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input ref={avatarRef} name="avatar" className="popup__form-field" id="field-avatar-link" required placeholder="Ссылка на аватар" type="url" autoComplete="off" />
            <span className="field-avatar-link-error popup__form-error"></span>
        </PopupWithForm>
    );
}

export default EditAvatarPopup;
