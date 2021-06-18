import { useContext } from 'react';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import Card from './Card';

function Main({
  onEditAvatar,
  onEditProfile,
  onAddCardClick,
  onCardClick,
  onCardDeleteButtonClick,
  cards,
  onCardLike,
}) {
  const currentUser = useContext(CurrentUserContext);

  return (
    <main className="content section page__section">
      <section className="profile">
        <div className="profile__avatar">
          <div className="profile__overlay" onClick={onEditAvatar}></div>
          <img
            className="profile__image"
            src={currentUser.avatar}
            alt="Аватар пользователя"
          />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <p className="profile__about">{currentUser.about}</p>
          <button
            className="button profile__button-edit"
            type="button"
            onClick={onEditProfile}
          ></button>
        </div>
        <button
          className="button profile__button-add"
          type="button"
          onClick={onAddCardClick}
        ></button>
      </section>
      <section className="elements">
        {cards.map((card) => (
          <Card
            card={card}
            key={card._id}
            onCardClick={onCardClick}
            onCardDeleteButtonClick={onCardDeleteButtonClick}
            onCardLike={onCardLike}
          />
        ))}
      </section>
    </main>
  );
}

export default Main;
