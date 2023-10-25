import React from "react";

function InfoTooltip({ isOpen, onClose, isSuccess }) {
    function handleOverlayClick(event) {
        if (event.target === event.currentTarget) onClose(event);
    }

    return (
        <div className={`popup popup_type_message ${isOpen ? "popup_opened" : ""}`}>
            <div className="popup__overflow popup__overflow_background_light" onClick={handleOverlayClick}></div>
            <div className="popup__container">
                <button type="button" aria-label="Закрыть" className="popup__close" onClick={onClose}></button>
                <div className="popup__message">
                    <div className={"popup__message_type_" + (isSuccess ? "success" : "unsuccess")}></div>
                    <h3 className="popup__message-title">{isSuccess ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}</h3>
                </div>
            </div>
        </div>
    );
}

export default InfoTooltip;
