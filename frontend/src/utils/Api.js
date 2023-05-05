import { myToken, baseUrl } from './constants'

class Api {
  constructor({ baseUrl, headers }) {
    this.baseURL = baseUrl
    this.headers = headers
  }

  handleFirstResponse(res) {
    if (res.ok) return res.json()
    console.log("Похоже возникла проблемк а")
    return Promise.reject(`Ошибка: ${res.status}`)
  }

  handleError(error) {
    console.log(`Произошла ошибка: ${error.name}`)
    console.log(`Сообщение ошибки: ${error.message}`)
	}
	
  _request(url, options) {
    return fetch(url, options)
      .then(this.handleFirstResponse)
  }

  getUserData() {
    return this._request(`${this.baseURL}/users/me`, { headers: this.headers })
  }

  getInitialCard() {
    return this._request(`${this.baseURL}/cards`, { headers: this.headers })
  }

  editProfile({ name, about }) {
    return this._request(`${this.baseURL}/users/me`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        name,
        about
      })
    })
  }

  deleteCard(id) {
    return this._request(`${this.baseURL}/cards/${id}`, {
      method: "DELETE",
      headers: this.headers,
    })
  }

  addCardRequest({ name, link }) {
    return this._request(`${this.baseURL}/cards`, {
      method: "POST",
      headers: this.headers,
      body: JSON.stringify({
        name,
        link
      })
    })
  }

  updateAvatar(avatar) {
    return this._request(`${this.baseURL}/users/me/avatar`, {
      method: "PATCH",
      headers: this.headers,
      body: JSON.stringify({
        avatar
      })
    })
  }

  setLike(id) {
    return this._request(`${this.baseURL}/cards/${id}/likes`, {
      method: "PUT",
      headers: this.headers,
    })
  }

  unsetLike(id) {
    return this._request(`${this.baseURL}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this.headers,
    })
  }

  changeLikeCardStatus(id, status) {
    if (status) {
      return this.unsetLike(id)
    }

    return this.setLike(id)
  }
}


export const api = new Api({
  baseUrl,
  headers: {
    'Content-Type': 'application/json'
  }
});