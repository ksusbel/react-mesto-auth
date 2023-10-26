import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register({ onRegister }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
 //   const navigate = useNavigate();

    const resetForm = () => {
        setEmail("");
        setPassword("");
        setError("");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        onRegister({ password, email }).then(resetForm);
    };

   /*  useEffect(() => {
        if (localStorage.getItem("jwt")) {
            navigate("/");
        }
    }, []); */

    return (
        <div className="login">
            <h2 className="login__title">Регистрация</h2>
            <form onSubmit={handleSubmit} className="login__form">
                <input id="email" name="email" type="email" placeholder="Email" autoComplete="off" required value={email} onChange={(e) => setEmail(e.target.value)} />
                <span className="login__error">{error.email}</span>
                <input id="password" name="password" type="password" placeholder="Пароль" autoComplete="off" required value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="login__error">{error.password}</span>
                <button type="submit" className="login__link">
                    Зарегистрироваться
                </button>
            </form>
            <div className="login__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="login" className="login__login-link">
                    Войти
                </Link>
            </div>
        </div>
    );
}

export default Register;
