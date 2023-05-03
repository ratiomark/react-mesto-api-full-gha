import { LS_TOKEN_KEY } from "./constants"

export const getTokenFromLS = () => {
	return localStorage.getItem(LS_TOKEN_KEY)
}