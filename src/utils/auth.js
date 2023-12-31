import { getResponse } from "./utils";

export const BASE_URL = "https://auth.nomoreparties.co";

export const register = ({ password, email }) => {
    return fetch(`${BASE_URL}/signup`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then((res) => getResponse(res));
};

export const authorize = ({ password, email }) => {
    return fetch(`${BASE_URL}/signin`, {
        method: "POST",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ password, email }),
    }).then((res) => getResponse(res));
};

export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
        method: "GET",
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
    }).then((res) => getResponse(res));
};
