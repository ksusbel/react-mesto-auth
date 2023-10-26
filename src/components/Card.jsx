import { useContext } from "react";
import CurrentUserContext from "../contexts/CurrentUserContext";

function Card({ card, onCardClick, onCardDelete, onCardLike, likeCounter }) {
    const currentUser = useContext(CurrentUserContext);

    // Определяем, являемся ли мы владельцем текущей карточки
    const isOwn = card.owner._id === currentUser._id;

    // Определяем, есть ли у карточки лайк, поставленный текущим пользователем
    const isLiked = card.likes.some((i) => i._id === currentUser._id);

    // Создаём переменную, которую после зададим в `className` для кнопки лайка
    const cardLikeButtonClassName = `elements__heart ${isLiked && "elements__heart_black"}`;

    function handleClick() {
        onCardClick(card);
    }

    function handleLikeClick() {
        onCardLike(card);
    }

    function handleDeleteClick() {
        onCardDelete(card);
    }

    return (
        <li className="elements__element">
            <div onClick={handleClick} className="elements__photo-grid" style={{ backgroundImage: `url(${card.link})` }} alt={card.name}></div>
            {isOwn && <button type="button" aria-label="Удалить" className="elements__dell" onClick={handleDeleteClick} />}
            <div className="elements__block">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__likes-container">
                    <button type="button" aria-label="Лайк" className={cardLikeButtonClassName} onClick={handleLikeClick}></button>
                    <p className="elements__likes-amount">{likeCounter}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;
