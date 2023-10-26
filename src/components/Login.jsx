import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Login({ onLogin }) {
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

        onLogin({ password, email })
            .then(resetForm)
          //  .then(() => navigate("/"))
            .catch((err) => setError(err.error || "Что-то пошло не так"));
    };

   /*  useEffect(() => {
        if (localStorage.getItem("token")) {
            navigate("/");
        }
    }, []); */

    return (
        <div className="login">
            <h2 className="login__title">Вход</h2>
            <form className="login__form" onSubmit={handleSubmit}>
                <input id="email" required name="email" type="email" placeholder="Email" autoComplete="off" value={email} onChange={(e) => setEmail(e.target.value)} />
                <span className="login__error">{error.email}</span>
                <input id="password" required name="password" type="password" placeholder="Пароль" autoComplete="off" value={password} onChange={(e) => setPassword(e.target.value)} />
                <span className="login__error">{error.password}</span>
                <button type="submit" className="login__link">
                    Войти
                </button>
            </form>
        </div>
    );
}

export default Login;
