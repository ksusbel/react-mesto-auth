import { useEffect, useState, useCallback } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";

import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import CurrentUserContext from "../contexts/CurrentUserContext";

import AddPlacePopup from "./AddPlacePopup";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";

import ProtectedRoute from "./ProtectedRoute";
import Login from "./Login";
import Register from "./Register";
import InfoTooltip from "./InfoTooltip";

import api from "../utils/api";
import * as userAuth from "../utils/auth";
import { withRouter } from "./withRouter";

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState({});
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loggedIn, setLoggedIn] = useState(false);
    const [registrationSuccess, setRegistrationSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [infoTooltip, setInfoTooltip] = useState(null);
    const navigate = useNavigate();

    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true);
    }

    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true);
    }

    function handleCardClick(selectedCard) {
        setSelectedCard(selectedCard);
    }

    function handleShowInfoTooltip() {
        setInfoTooltip(true);
    }

    function closeAllPopups() {
        setIsEditProfilePopupOpen(false);
        setIsAddPlacePopupOpen(false);
        setIsEditAvatarPopupOpen(false);
        setSelectedCard({});
        setInfoTooltip(false);
    }

    function handleUpdateUser(newUserInfo) {
        api.editUserInfo(newUserInfo)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleUpdateAvatar(newAvatar) {
        api.editAvatar(newAvatar)
            .then((res) => {
                setCurrentUser(res);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleCardLike(card) {
        // Снова проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some((i) => i._id === currentUser._id);

        // Отправляем запрос в API и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, isLiked)
            .then((newCard) => {
                const newCards = cards.map((c) => (c._id === card._id ? newCard : c));
                setCards(newCards);
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleCardDelete(card) {
        api.removeCard(card._id)
            .then(() => {
                setCards((state) => state.filter((c) => c._id !== card._id));
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    function handleAddPlaceSubmit(newCard) {
        api.addNewCard(newCard)
            .then((res) => {
                setCards([res, ...cards]);
                closeAllPopups();
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    }

    const onRegister = ({ password, email }) => {
        return userAuth
            .register({ password, email })
            .then(() => {
                setRegistrationSuccess(true);
                handleShowInfoTooltip();
                navigate("/sign-in");
            })
            .catch((res) => {
                setRegistrationSuccess(false);
                handleShowInfoTooltip();
                console.log("Пользователь с таким email уже зарегистрирован");
                return res;
            });
    };

    const onLogin = (data) => {
        return userAuth
            .authorize(data)
            .then((res) => {
                localStorage.setItem("token", res.token);
            //    handleTokenCheck();
                setUserEmail(data.email);
            //    console.log(data.email);
                setLoggedIn(true);
                navigate("/");
            })
            .catch((err) => {
                setRegistrationSuccess(false);
                handleShowInfoTooltip();
                console.log("Неправильные имя пользователя или пароль");
                console.log(`Ошибка: ${err}`);
                navigate("/sign-in");
            });
    };

    useEffect(() => {
        if (loggedIn) {
            api.getUserInfo()
                .then((data) => {
                    setCurrentUser(data);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
            api.getInitialCards()
                .then((initialCards) => {
                    setCards(initialCards);
                })
                .catch((err) => {
                    console.log(`Ошибка: ${err}`);
                });
        }
    }, [loggedIn]);

    const onSignOut = () => {
        localStorage.removeItem("token");
        setLoggedIn(false);
        navigate("/sign-in");
    };

    const handleTokenCheck = useCallback(() => {
        const jwt = localStorage.getItem("token");
        if (!jwt) {
            return;
        }
        userAuth
            .getContent(jwt)
            .then((data) => {
                setUserEmail(data.data.email);
                setLoggedIn(true);
                navigate("/");
            })
            .catch((err) => {
                console.log(`Ошибка: ${err}`);
            });
    });

    useEffect(() => {
        handleTokenCheck();
    }, []);

    useEffect(() => {
        if (loggedIn) {
            navigate("/");
        }
    }, [loggedIn]);

    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header loggedIn={loggedIn} email={userEmail} onSignOut={onSignOut} />
                <Routes>
                    <Route path="/sign-up" element={<Register onRegister={onRegister} handleShowInfoTooltip={handleShowInfoTooltip} />} />
                    <Route path="/sign-in" element={<Login onLogin={onLogin} />} />
                    <Route
                        path="/"
                        element={
                            <ProtectedRoute
                                loggedIn={loggedIn}
                                component={Main}
                                onSignOut={onSignOut}
                                onEditProfile={handleEditProfileClick}
                                onAddPlace={handleAddPlaceClick}
                                onEditAvatar={handleEditAvatarClick}
                                onCardClick={handleCardClick}
                                cards={cards}
                                onCardLike={handleCardLike}
                                onCardDelete={handleCardDelete}
                                email={userEmail}
                            />
                        }
                    />
                    <Route path="*" element={loggedIn ? <Navigate to="/" /> : <Navigate to="/sign-in" />} />
                </Routes>
                <Footer />
                <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} />
                <EditProfilePopup onUpdateUser={handleUpdateUser} isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} />
                <AddPlacePopup onAddCard={handleAddPlaceSubmit} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} />
                <ImagePopup card={selectedCard} onClose={closeAllPopups} />
                <InfoTooltip isOpen={infoTooltip} onClose={closeAllPopups} isSuccess={registrationSuccess} />
            </CurrentUserContext.Provider>
        </div>
    );
}

export default withRouter(App);
