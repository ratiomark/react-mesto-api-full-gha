import { createContext, useState, useEffect, useMemo } from 'react'
import { api } from '../utils/Api'

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
			.then(res => {
				console.log('CurrentUserContext ответ от getUserData', res.data)
				setUserData(res.data)
			})
			.catch((error) =>
				console.log(`Возникла ошибка. 
				Название ошибки: ${error.name}. 
				Текст ошибки: ${error.message}`)
			)
	}, [])

	return (
		<CurrentUserContext.Provider value={userDataAndSetter}>
			{children}
		</CurrentUserContext.Provider>
	)
}
