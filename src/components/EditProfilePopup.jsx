import React from "react";
import PopupWithForm from "./PopupWithForm";
import CurrentUserContext from "../contexts/CurrentUserContext";

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isDataLoad }) {
    const [profileName, setProfileName] = React.useState("");
    const [profileJob, setProfileJob] = React.useState("");

    const currentUser = React.useContext(CurrentUserContext);

    const { name, about } = currentUser;

    function handleChangeName(evt) {
        setProfileName(evt.target.value);
    }

    function handleChangeJob(evt) {
        setProfileJob(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        onUpdateUser({
            name: profileName,
            about: profileJob,
        });
    }

    React.useEffect(() => {
        setProfileName(name);
        setProfileJob(about);
    }, [currentUser]);

    return (
        <PopupWithForm name="edit_prof" title="Редактировать профиль" isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit}>
            <input value={profileName || ""} onChange={handleChangeName} name="username" placeholder="Имя" required minLength="2" maxLength="40" className="popup__form-field" id="field-name" type="text" />
            <span className="field-name-error popup__form-error"></span>
            <input value={profileJob || ""} onChange={handleChangeJob} name="job" placeholder="о себе" required minLength="2" maxLength="200" className="popup__form-field" id="field-job" type="text" />
            <span className="field-job-error popup__form-error"></span>
        </PopupWithForm>
    );
}

export default EditProfilePopup;
