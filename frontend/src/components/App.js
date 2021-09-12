import { useState, useEffect } from 'react';
import { Redirect, Route, Switch, useHistory } from 'react-router-dom';
import api from '../utils/Api';
import authApi from '../utils/AuthApi';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import ConfirmPopup from './ConfirmPopup';
import ImagePopup from './ImagePopup';
import InfoTooltip from './InfoTooltip';
import Login from './Login';
import Register from './Register';
import ProtectedRoute from './ProtectedRoute';
import CurrentUserContext from '../contexts/CurrentUserContext.js';
import errorImage from '../images/popup/errorImage.svg';
import successImage from '../images/popup/successImage.svg';

function App() {
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false);
  const [isAddCardPopupOpen, setIsAddCardPopupOpen] = useState(false);
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false);
  const [isImagePopupOpen, setIsImagePopupOpen] = useState(false);
  const [isConfirmPopupOpen, setIsConfirmPopupOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [infoContent, setInfoContent] = useState({
    image: '',
    text: '',
  });
  const history = useHistory();

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddCardClick() {
    setIsAddCardPopupOpen(true);
  }

  function handleCardImageClick(card) {
    setSelectedCard(card);
    setIsImagePopupOpen(true);
  }

  function handleDeleteCardClick(card) {
    setSelectedCard(card);
    setIsConfirmPopupOpen(true);
  }

  function handleUpdateCards(updatedCard) {
    setCards((prevCardsState) =>
      prevCardsState.map((card) =>
        card._id === updatedCard._id ? updatedCard : card
      )
    );
  }

  function handleUpdateCardsList(deletedCard) {
    setCards((prevCardsState) =>
      prevCardsState.filter((card) => card._id !== deletedCard._id)
    );
  }

  function closeAllPopups() {
    setIsEditProfilePopupOpen(false);
    setIsEditAvatarPopupOpen(false);
    setIsImagePopupOpen(false);
    setIsAddCardPopupOpen(false);
    setIsConfirmPopupOpen(false);
    setIsInfoTooltipOpen(false);
  }

  function handleSignInSubmit(userData) {
    authApi
      .signInUser(userData)
      .then((res) => {
        if (res.token) {
          localStorage.setItem('jwt', res.token);
          setLoggedIn(true);
          setEmail(userData.email);
          history.push('/');
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

   useEffect(() => {
    function checkToken() {
      const jwt = localStorage.getItem('jwt');
      if (jwt) {
        setLoggedIn(true);
        history.push('/');
      }
    }

    checkToken();
  }, [history]);

  function handleSignUpSubmit(userData) {
    authApi
      .signUpUser(userData)
      .then((res) => {
        if (res.email) {
          setIsInfoTooltipOpen(true);
          setInfoContent({
            image: successImage,
            text: 'Вы успешно зарегистрировались!',
          });
          history.push('/signin');
        }
      })
      .catch((err) => {
        setIsInfoTooltipOpen(true);
        setInfoContent({
          image: errorImage,
          text: 'Что-то пошло не так! Попробуйте еще раз.',
        });
        console.log(err);
      });
  }

  function handleSignOutClick() {
    authApi.signOutUser()
    .then((res) => {
      localStorage.removeItem('jwt');
      setLoggedIn(false);
      history.push('/signin');
    })
    .catch((err) => {
      console.log(err)
    });
  }

  useEffect(() => {
    if (loggedIn) {
      Promise.all([api.getUserData(), api.getCards()])
        .then(([userData, cards]) => {
          setCurrentUser(userData);
          setCards(cards);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [loggedIn]);

  function handleUpdateUser(newUserData) {
    setIsLoading(true);
    api
      .updateUserData(newUserData)
      .then((userData) => {
        setCurrentUser(userData);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleUpdateUserAvatar(newUserAvatar) {
    setIsLoading(true);
    api
      .updateUserAvatar(newUserAvatar)
      .then((userAvatar) => {
        setCurrentUser(userAvatar);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleAddCardSubmit(userCardData) {
    setIsLoading(true);
    api
      .addNewCard(userCardData)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some((like) => like === currentUser._id);
    api
      .toggleCardLike(card._id, !isLiked)
      .then((likedCard) => {
        handleUpdateCards(likedCard);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleCardDelete() {
    setIsLoading(true);
    api
      .deleteCard(selectedCard._id)
      .then(() => {
        handleUpdateCardsList(selectedCard);
        setIsConfirmPopupOpen(false);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  useEffect(() => {
    function handleEscClose(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      }
    }
    document.addEventListener('keydown', handleEscClose);

    return () => {
      document.removeEventListener('keydown', handleEscClose);
    };
  }, []);

  return (
    <div className="page">
      <CurrentUserContext.Provider value={currentUser}>
        <Header userEmail={email} onSignOut={handleSignOutClick} />
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            loggedIn={loggedIn}
            component={Main}
            onEditProfile={handleEditProfileClick}
            onAddCardClick={handleAddCardClick}
            onEditAvatar={handleEditAvatarClick}
            onCardClick={handleCardImageClick}
            onCardDeleteButtonClick={handleDeleteCardClick}
            onCardLike={handleCardLike}
            onUpdateCards={handleUpdateCards}
            cards={cards}
          />
          <Route path="/signin">
            <Login onLogin={handleSignInSubmit} />
          </Route>
          <Route path="/signup">
            <Register onRegister={handleSignUpSubmit} />
          </Route>
          <Route>
            {loggedIn ? <Redirect to="/" /> : <Redirect to="/signin" />}
          </Route>
        </Switch>
        {loggedIn && <Footer />}
        <AddPlacePopup
          isOpen={isAddCardPopupOpen}
          onClose={closeAllPopups}
          onAddCard={handleAddCardSubmit}
          isLoading={isLoading}
        />
        <EditProfilePopup
          isOpen={isEditProfilePopupOpen}
          onClose={closeAllPopups}
          onUpdateUser={handleUpdateUser}
          isLoading={isLoading}
        />
        <EditAvatarPopup
          isOpen={isEditAvatarPopupOpen}
          onClose={closeAllPopups}
          onUpdateAvatar={handleUpdateUserAvatar}
          isLoading={isLoading}
        />
        <ConfirmPopup
          isOpen={isConfirmPopupOpen}
          onClose={closeAllPopups}
          onCardDelete={handleCardDelete}
          isLoading={isLoading}
        />
        <ImagePopup
          card={selectedCard}
          isOpen={isImagePopupOpen}
          onClose={closeAllPopups}
        />
        <InfoTooltip
          isOpen={isInfoTooltipOpen}
          onClose={closeAllPopups}
          infoContent={infoContent}
        />
      </CurrentUserContext.Provider>
    </div>
  );
}

export default App;
