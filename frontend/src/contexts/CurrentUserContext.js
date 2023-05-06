import { createContext, useState, useEffect, useMemo, useContext } from 'react'
import { consoleError } from '../utils/consoleError'
import { ApiContext } from './ApiContext'

export const CurrentUserContext = createContext()

export const CurrentUserProvider = (props) => {
	const { children } = props
	const api = useContext(ApiContext)
	const [userData, setUserData] = useState()

	const userDataAndSetter = useMemo(() => ({
		userData,
		setUserData
	}), [userData, setUserData])


	useEffect(() => {
		if (api) {
			api
				.getUserData()
				.then(res => setUserData(res.data))
				.catch(consoleError)
		}
	}, [api])


	return (
		<CurrentUserContext.Provider value={userDataAndSetter}>
			{children}
		</CurrentUserContext.Provider>
	)
}
