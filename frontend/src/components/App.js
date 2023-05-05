import { Header } from './Header'
import { Main } from './Main'
import { Footer } from './Footer'
import { useContext, useEffect, useState, useCallback } from 'react'
import { ImagePopup } from './ImagePopup'
import { PopupWithForm } from './PopupWithForm'
import { CurrentUserContext } from '../contexts/CurrentUserContext'
import { api } from '../utils/Api'
import { EditProfilePopup } from './EditProfilePopup'
import { EditAvatarPopup } from './EditAvatarPopup'
import { AddPlacePopup } from './AddPlacePopup'
import { TokenContext } from '../contexts/TokenContext'
import { getTokenFromLS } from '../utils/getTokenFromLS'

function App() {
	const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = useState(false)
	const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = useState(false)
	const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = useState(false)
	const [isRemoveCardPopupOpen, setIsRemoveCardPopupOpen] = useState(false)
	const [selectedCard, setSelectedCard] = useState(null)
	const [isLoading, setIsLoading] = useState(false)
	const [cards, setCards] = useState([])
	const { userData, setUserData } = useContext(CurrentUserContext)
	const { setToken, email } = useContext(TokenContext)

	const isOpen =
		isEditAvatarPopupOpen ||
		isEditProfilePopupOpen ||
		isAddPlacePopupOpen ||
		selectedCard

	const closeByEscape = useCallback((e) => {
		if (e.key === 'Escape') {
			closeAllPopups()
		}
	}, [])

	useEffect(() => {
		if (isOpen) {
			document.addEventListener('keydown', closeByEscape);
			return () => {
				document.removeEventListener('keydown', closeByEscape);
			}
		}
	}, [isOpen, closeByEscape])


	useEffect(() => {
		api.headers.token = getTokenFromLS()
		console.log(api)
		api
			.getInitialCard()
			.then((res) => {
				console.log(res)
				setCards(res.data)
			}
			)
			.catch((error) =>
				console.log(`Возникла ошибка. 
				Название ошибки: ${error.name}. 
				Текст ошибки: ${error.message}`)
			)
	}, [])

	const handleCardLike = (card) => {
		const isLiked = card.likes.some((i) => i._id === userData._id)
		api
			.changeLikeCardStatus(card._id, isLiked)
			.then((cardFromServer) => {
				setCards((state) =>
					state.map((stateCard) => {
						return stateCard._id === card._id ? cardFromServer.data : stateCard
					})
				)
			})
			.catch((error) =>
				console.log(`Возникла ошибка. 
					Название ошибки: ${error.name}. 
					Текст ошибки: ${error.message}`)
			)
	}

	const handleCardDelete = (id) => {
		api
			.deleteCard(id)
			.then(() => {
				setCards((state) => state.filter((card) => card._id !== id))
			})
			.catch((error) =>
				console.log(`Возникла ошибка. 
				Название ошибки: ${error.name}. 
				Текст ошибки: ${error.message}`)
			)
	}

	const handleEditProfileSubmit = (newUserData) => {
		setIsLoading(true)
		api
			.editProfile(newUserData)
			.then((res) => setUserData(res.data))
			.then(onClose)
			.catch((error) =>
				console.log(`Возникла ошибка. 
				Название ошибки: ${error.name}. 
				Текст ошибки: ${error.message}`)
			)
			.finally(() => setIsLoading(false))
	}

	const handleEditAvatarSubmit = (link) => {
		setIsLoading(true)
		api
			.updateAvatar(link)
			.then((res) => setUserData(res.data))
			.then(onClose)
			.catch((error) =>
				console.log(`Возникла ошибка. 
				Название ошибки: ${error.name}. 
				Текст ошибки: ${error.message}`)
			)
			.finally(() => setIsLoading(false))
	}

	const handleAddPlaceSubmit = (cardData) => {
		setIsLoading(true)
		api
			.addCardRequest(cardData)
			.then((res) => setCards((prev) => [res.data, ...prev]))
			.then(onClose)
			.catch(error => console.log(`Возникла ошибка. Информация об ошибке: ${error}`))
			.finally(() => setIsLoading(false))
	}

	const onAddPlace = () => {
		setIsAddPlacePopupOpen((prev) => !prev)
	}
	const onEditAvatar = () => {

		setIsEditAvatarPopupOpen((prev) => !prev)
	}

	const onCardClick = (card) => {
		setSelectedCard(card)
	}

	const onEditProfileClick = () => {
		console.log('!!!!!!!!!!!!!!!!')
		setIsEditProfilePopupOpen((prev) => !prev)
	}

	const closeAllPopups = () => {
		setIsEditProfilePopupOpen(false)
		setIsAddPlacePopupOpen(false)
		setIsEditAvatarPopupOpen(false)
		setIsRemoveCardPopupOpen(false)
		setSelectedCard(null)
	}

	const onClose = (e = 'manualClosing') => {
		if (e.target === e.currentTarget || e === 'manualClosing') {
			closeAllPopups()
		}
	}

	const onLogOut = () => localStorage.clear()

	return (
		<div className='page'>
			<Header
				title={'Выйти'}
				to={'/sign-in'}
				email={email}
				onClickHeaderLink={onLogOut}
			/>
			<Main
				onEditProfile={onEditProfileClick}
				onAddPlace={onAddPlace}
				onEditAvatar={onEditAvatar}
				onCardClick={onCardClick}
				handleCardLike={handleCardLike}
				handleCardDelete={handleCardDelete}
				onClose={onClose}
				cards={cards}
			/>

			<ImagePopup
				selectedCard={selectedCard}
				onClose={onClose}
			/>



			<EditProfilePopup
				// handleEditProfileSubmit={handleEditProfileSubmit}
				isOpen={isEditProfilePopupOpen}
				onClose={onClose}
				isLoading={isLoading}
			/>

			<EditAvatarPopup
				handleEditAvatarSubmit={handleEditAvatarSubmit}
				isOpen={isEditAvatarPopupOpen}
				onClose={onClose}
				isLoading={isLoading}
			/>

			<AddPlacePopup
				handleAddPlaceSubmit={handleAddPlaceSubmit}
				isOpen={isAddPlacePopupOpen}
				onClose={onClose}
				isLoading={isLoading}
			/>

			<PopupWithForm
				title='Вы уверены?'
				name='removeCard'
				isOpen={isRemoveCardPopupOpen}
				onClose={onClose}
				buttonText='Да'
			/>
			<Footer />
		</div>
	)
}

export default App
