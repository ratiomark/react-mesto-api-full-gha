import { useRef, useEffect } from "react"
import { PopupWithForm } from "./PopupWithForm"

export const EditAvatarPopup = (props) => {
	const {
		handleEditAvatarSubmit,
		isOpen,
		onClose,
		isLoading
	} = props
	
	const myRef = useRef()

	useEffect(() => {
		myRef.current.value = ''
	}, [isOpen])

	const handleSubmit = (event) => {
		event.preventDefault()
		handleEditAvatarSubmit(myRef.current.value)
	}

	return (
		<PopupWithForm
			title='Обновить аватар'
			name='updateAvatar'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			buttonText={isLoading? "В процессе..." : "Сохранить"}>
			<input
				ref={myRef}
				className='input popup__name'
				name='linkToNewAvatar'
				id='popup__name-update-avatar'
				type='url'
				required
				placeholder='Ссылка на изображение аватара'
			/>
			<span className='popup__name-update-avatar-error message-error'></span>
		</PopupWithForm>
	)
}


