import { createContext, useState, useMemo, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../utils/AuthAPI'
import { consoleError } from '../utils/consoleError'
import { getTokenFromLS } from '../utils/getTokenFromLS'
import { setTokenToLS } from '../utils/setTokenToLS'

export const TokenContext = createContext()

export const TokenContextProvider = (props) => {
	const { children } = props
	const navigate = useNavigate()

	const [token, setToken] = useState(getTokenFromLS())
	const [email, setEmail] = useState()

	const dataAndSetter = useMemo(() => ({
		token,
		setToken,
		email,
		setEmail,
	}), [token, email,])

	useEffect(() => {
		if (token) {
			setTokenToLS(token)
			auth.checkToken(token)
				.then(res => {
					setEmail(res.data.email)
					navigate('/', { replace: true })
				})
				.catch(consoleError)
		} else {
			console.log("В хранилище нет токена")
		}
	}, [token, navigate])


	return (
		<TokenContext.Provider value={dataAndSetter}>
			{children}
		</TokenContext.Provider>
	)
}
