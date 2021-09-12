class Api {
  constructor({ baseUrl, headers, credentials }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
    this._credentials = credentials;
  }

  getCards() {
    return this._sendRequest('/cards', 'GET');
  }

  getUserData() {
    return this._sendRequest('/users/me', 'GET');
  }

  updateUserData(newUserData) {
    return this._sendRequest('/users/me', 'PATCH', newUserData);
  }

  toggleCardLike(cardId, isLiked) {
    if (isLiked) {
      return this._sendRequest(`/cards/${cardId}/likes`, 'PUT');
    } else {
      return this._sendRequest(`/cards/${cardId}/likes`, 'DELETE');
    }
  }

  addNewCard(userCardData) {
    return this._sendRequest('/cards', 'POST', userCardData);
  }

  deleteCard(cardId) {
    return this._sendRequest(`/cards/${cardId}`, 'DELETE');
  }

  updateUserAvatar(newUserAvatar) {
    return this._sendRequest('/users/me/avatar', 'PATCH', newUserAvatar);
  }

  _sendRequest(
    path,
    method,
    body,
    headers = this._headers,
    credentials = this._credentials
  ) {
    const options = {
      method,
      headers,
      credentials,
    };
    if (body) {
      options.body = JSON.stringify(body);
    }
    return fetch(`${this._baseUrl}${path}`, options).then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status} ${res.statusText}`);
    });
  }
}

const api = new Api({
  baseUrl: 'http://localhost:3000',
  credentials: 'include',
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;
