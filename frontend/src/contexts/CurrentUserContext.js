import { createContext, useState, useEffect, useMemo } from 'react'
import { api } from '../utils/Api'
import { consoleError } from '../utils/consoleError'

export const CurrentUserContext = createContext()

export const CurrentUserProvider = (props) => {
	const { children } = props
	const [userData, setUserData] = useState()

	const userDataAndSetter = useMemo(() => ({
		userData,
		setUserData
	}), [userData])

	useEffect(() => {
		api
			.getUserData()
			.then(res => setUserData(res.data))
			.catch(consoleError)
	}, [])

	return (
		<CurrentUserContext.Provider value={userDataAndSetter}>
			{children}
		</CurrentUserContext.Provider>
	)
}
