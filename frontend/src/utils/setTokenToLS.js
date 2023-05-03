import { LS_TOKEN_KEY } from "./constants"

export const setTokenToLS = (token) => {
	return localStorage.setItem(LS_TOKEN_KEY, token)
}