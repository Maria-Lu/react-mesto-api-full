function ImagePopup({ card, isOpen, onClose }) {

  function handleOverlayClose(evt) {
    if (evt.target === evt.currentTarget) {
      onClose();
    }
  }

  return (
    <section
      className={`popup preview-popup ${isOpen ? 'popup_opened' : ''}`}
      onClick={handleOverlayClose}
    >
      <div className="preview-popup__container">
        <button
          className="button popup__button-close"
          type="button"
          onClick={onClose}
        ></button>
        <figure className="preview-popup__figure">
          <img
            className="preview-popup__image"
            src={card.link}
            alt={card.name}
          />
          <figcaption className="preview-popup__caption">
            {card.name}
          </figcaption>
        </figure>
      </div>
    </section>
  );
}

export default ImagePopup;
