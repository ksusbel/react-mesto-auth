import React from "react";

function ImagePopup(props) {
    return (
        <div className={`popup popup_type_img ${props.card.link ? "popup_opened" : ""}`}>
            <div className="popup__overflow popup__overflow_background_dark"></div>
            <div className="popup__container-img">
                <button type="button" aria-label="Закрыть" className="popup__close" onClick={props.onClose}></button>
                <div className="popup__cont-img">
                    <img className="popup__img-full" src={props.card ? props.card.link : ""} alt={props.card.name} />
                    <h2 className="popup__img-title">{props.card.name}</h2>
                </div>
            </div>
        </div>
    );
}

export default ImagePopup;
