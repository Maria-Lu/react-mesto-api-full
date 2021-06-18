function InfoTooltip({ onClose, isOpen, infoContent }) {
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
        <button
          className="button popup__button-close popup__button-close_position_center"
          type="button"
          onClick={onClose}
        ></button>
        <img
          className="popup__image"
          src={infoContent.image}
          alt="Статус регистрации"
        />
        <p className="popup__text">{infoContent.text}</p>
      </div>
    </section>
  );
}

export default InfoTooltip;
