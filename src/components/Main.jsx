import { useContext } from "react";
import Card from "./Card";
import CurrentUserContext from "../contexts/CurrentUserContext";

//import defaultAvatar from "../images/avatar.jpg";

function Main({ onEditAvatar, onEditProfile, onAddPlace, onCardClick, cards, onCardLike, onCardDelete }) {
    const { name, about, avatar } = useContext(CurrentUserContext);

    return (
        <main className="content">
            <section className="profile">
                <div className="profile__avatar-container">
                    <button type="button" className="profile__avatar-edit-button" aria-label="Изменить аватар" onClick={onEditAvatar}></button>
                    <div className="profile__avatar" style={{ backgroundImage: `url(${avatar})` }}></div>
                </div>
                <div className="profile__info">
                    <div className="profile__block">
                        <h1 className="profile__name">{name}</h1>
                        <button type="button" aria-label="Изменить" className="profile__edit-button" onClick={onEditProfile}></button>
                    </div>
                    <p className="profile__description">{about}</p>
                </div>
                <button type="button" aria-label="Добавить" className="profile__add-button" onClick={onAddPlace}></button>
            </section>
            <section className="elements">
                <ul className="elements__list">
                    {cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={onCardClick} likeCounter={card.likes.length} onCardLike={onCardLike} onCardDelete={onCardDelete} />
                    ))}
                </ul>
            </section>
        </main>
    );
}

export default Main;
