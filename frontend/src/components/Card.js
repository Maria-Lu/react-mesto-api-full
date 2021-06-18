import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';

function Card({
  card,
  onCardClick,
  onCardDeleteButtonClick,
  onCardLike
}) {
  const currentUser = useContext(CurrentUserContext);

  const isOwn = card.owner === currentUser._id;
  const isLiked = card.likes.some((like) => like === currentUser._id);
  const likeButtonClassName = (`button element__button-like ${
    isLiked ? 'element__button-like_active' : ''
  }`);

  function handleCardClick() {
    onCardClick(card);
  }

  function handleDeleteClick() {
    onCardDeleteButtonClick(card);
  }

  function handleCardLike() {
    onCardLike(card);
  }

  return (
    <article className="element" key={card._id}>
      {isOwn && (
        <button
          className="button element__button-trash"
          type="reset"
          onClick={handleDeleteClick}
        ></button>
      )}
      <div className="element__image-container">
        <img
          className="element__image"
          src={card.link}
          alt={card.name}
          onClick={handleCardClick}
        />
      </div>
      <h2 className="element__title">{card.name}</h2>
      <div className="element__like-container">
        <button
          onClick={handleCardLike}
          className={likeButtonClassName}
          type="button"
        ></button>
        <span className="element__like-counter">{card.likes.length}</span>
      </div>
    </article>
  );
}

export default Card;
