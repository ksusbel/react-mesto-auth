import React from "react";
import { Route, Routes, Link, useLocation } from "react-router-dom";

function Header({ loggedIn, email, onSignOut }) {
    const location = useLocation();

    return (
        <header className="header">
            <div className="header__logo"></div>
            <Routes>
                <Route
                    path="/sign-in"
                    element={
                        <Link to="/sign-up" className="header__link">
                            Регистрация
                        </Link>
                    }
                />
                <Route
                    path="/sign-up"
                    element={
                        <Link to="/sign-in" className="header__link">
                            Войти
                        </Link>
                    }
                />
            </Routes>
            {loggedIn && (
                <nav className="header__nav">
                    <span>{email}</span>
                    <button className="header__sign-out" onClick={() => onSignOut()}>
                        Выйти
                    </button>
                </nav>
            )}
        </header>
    );
}

export default Header;
