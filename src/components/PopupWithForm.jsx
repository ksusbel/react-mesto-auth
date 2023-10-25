import React from "react";

function PopupWithForm({ isOpen, onClose, name, title, children, onSubmit }) {
    return (
        <div className={`popup popup_type_${name} ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__overflow popup__overflow_background_light"></div>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="popup__close" onClick={onClose}></button>
                <form className="popup__form" name={`${name}`} onSubmit={onSubmit} noValidate>
                    <h2 className="popup__form-title">{title}</h2>
                    {children}
                    <input type="submit" className="popup__form-save" value="Сохранить" />
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;
