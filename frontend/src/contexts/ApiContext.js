import { createContext, useMemo, useContext } from 'react'
import { Api } from '../utils/Api'
import { baseUrl } from '../utils/constants'
import { TokenContext } from './TokenContext'



export const ApiContext = createContext()

export const ApiContextProvider = (props) => {
	const { children } = props
	const { token } = useContext(TokenContext)

	const api = useMemo(() => {
		if (token) {
			return new Api({
				baseUrl,
				headers: {
					'Content-Type': 'application/json',
					authorization: token
				}
			})
		} else return null
	}, [token])


	return (
		<ApiContext.Provider value={api}>
			{children}
		</ApiContext.Provider>
	)
}
