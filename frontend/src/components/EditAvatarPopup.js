import { useRef, useEffect, useState } from 'react';
import PopupWithForm from './PopupWithForm';

function EditAvatarPopup({
  isOpen,
  onClose,
  onUpdateAvatar,
  isLoading,
}) {
  const avatarRef = useRef();
  const [isAvatarValid, setIsAvatarValid] = useState(false);
  const [avatarValidationMessage, setAvatarValidationMessage] = useState('');

  useEffect(() => {
    avatarRef.current.value = '';
    setIsAvatarValid(false);
    setAvatarValidationMessage('');
  }, [isOpen]);

  function handleSubmit(evt) {
    evt.preventDefault();
    onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
  }

  function handleLinkInput(evt) {
    const { validity, validationMessage } = evt.target;
    setIsAvatarValid(validity.valid);
    setAvatarValidationMessage(validationMessage);
  }

  return (
    <PopupWithForm
      name="edit-profile"
      title="Обновить аватар"
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit}
      isLoading={isLoading}
      buttonText="Сохранить"
      buttonLoadingText="Сохранение..."
      isButtonDisabled={!isAvatarValid}
    >
      <input
        id="avatar-input"
        className={`popup__input ${
          avatarValidationMessage? 'popup__input_type_error' : ''
        }`}
        type="url"
        name="avatar"
        placeholder="Ссылка на картинку"
        required
        ref={avatarRef}
        onChange={handleLinkInput}
      />
      <span
        className="popup__error"
      >
        {avatarValidationMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
