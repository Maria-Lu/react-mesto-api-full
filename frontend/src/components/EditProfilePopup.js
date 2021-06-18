import { useState, useContext, useEffect } from 'react';
import PopupWithForm from './PopupWithForm';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function EditProfilePopup({ isOpen, onClose, onUpdateUser, isLoading }) {
  const currentUser = useContext(CurrentUserContext);
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [isAboutValid, setIsAboutValid] = useState(true);
  const [nameValidationMessage, setNameValidationMessage] = useState('');
  const [aboutValidationMessage, setAboutValidationMessage] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    setName(currentUser.name);
    setAbout(currentUser.about);
    setNameValidationMessage('');
    setAboutValidationMessage('');
    setIsButtonDisabled(true);
  }, [currentUser, isOpen]);

  function handleNameInput(evt) {
    const { value, validity, validationMessage } = evt.target;

    setName(value);
    setIsNameValid(validity.valid);
    setNameValidationMessage(validationMessage);

    if (!validity.valid) {
      setIsButtonDisabled(true);
    } else if (about && isAboutValid) {
      setIsButtonDisabled(false);
    }
  }

  function handleAboutInput(evt) {
    const { value, validity, validationMessage } = evt.target;

    setAbout(value);
    setIsAboutValid(validity.valid);
    setAboutValidationMessage(validationMessage);

    if (!validity.valid) {
      setIsButtonDisabled(true);
    } else if (name && isNameValid) {
      setIsButtonDisabled(false);
    }
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateUser({
      name,
      about,
    });
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Редактировать профиль"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isButtonDisabled={isButtonDisabled}
    >
      <input
        id="name-input"
        className={`popup__input ${
          nameValidationMessage ? 'popup__input_type_error' : ''
        }`}
        type="text"
        name="name"
        placeholder="Имя"
        required
        minLength="2"
        maxLength="40"
        onChange={handleNameInput}
        value={name || ''}
      />
      <span className="popup__error">{nameValidationMessage}</span>
      <input
        id="about-input"
        className={`popup__input ${
          aboutValidationMessage ? 'popup__input_type_error' : ''
        }`}
        type="text"
        name="about"
        placeholder="О себе"
        required
        minLength="2"
        maxLength="200"
        onChange={handleAboutInput}
        value={about || ''}
      />
      <span className="popup__error">{aboutValidationMessage}</span>
    </PopupWithForm>
  );
}

export default EditProfilePopup;
