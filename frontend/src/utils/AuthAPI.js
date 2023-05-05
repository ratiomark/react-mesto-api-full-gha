import { AuthAPIbaseUrl } from './constants'

class AuthAPI {
	constructor({ baseUrl, headers }) {
		this.baseURL = baseUrl
		this.headers = headers
	}

	handleFirstResponse(res) {
		if (res.ok) return res.json()
		console.log("Похоже возникла проблемка")
		return Promise.reject(`Ошибка: ${res.status}`)
	}

	handleError(error) {
		console.log(`Произошла ошибка: ${error.name}`)
		console.log(`Сообщение ошибки: ${error.message}`)
	}

	_request(url, options) {
		console.log(url)
		return fetch(url, options)
			.then(this.handleFirstResponse)
	}


	signIn({ email, password }) {
		// console.log(`${this.baseURL}/signin`)
		return this._request(`${this.baseURL}/signin`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify({
				email,
				password
			})
		})
	}

	signUp({ email, password }) {
		// console.log(`${this.baseURL}/signup`)
		// console.log(email, password)
		return this._request(`${this.baseURL}/signup`, {
			method: "POST",
			headers: this.headers,
			body: JSON.stringify({
				email,
				password
			})
		})
	}

	checkToken(JWT) {
		return this._request(`${this.baseURL}/users/me`, {
			method: "GET",
			headers: {
				...this.headers,
				...{ "Authorization": `Bearer ${JWT}` }
			}
		})
	}

}


export const auth = new AuthAPI({
	baseUrl: AuthAPIbaseUrl,
	headers: {
		"Content-Type": "application/json"
	}
});