function PopupWithForm({
  name,
  title,
  isOpen,
  onClose,
  onSubmit,
  isLoading,
  buttonText,
  buttonLoadingText,
  children,
  isButtonDisabled,
}) {

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <section
      className={`popup ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}
    >
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        <button
          className="button popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <form
          className="popup__form"
          name={name}
          noValidate
          onSubmit={onSubmit}
        >
          {children}
          <button
            className={`button popup__button-submit ${
              !isButtonDisabled? '' : 'popup__button-submit_disabled'
            }`}
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? buttonLoadingText : buttonText}
          </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
