import { useContext, useEffect } from "react"
import { CurrentUserContext } from "../contexts/CurrentUserContext"
import { useForm } from "../hooks/useForm"
import { PopupWithForm } from "./PopupWithForm"

export const EditProfilePopup = (props) => {
	const {
		handleEditProfileSubmit,
		isOpen,
		onClose,
		isLoading
	} = props

	const { userData } = useContext(CurrentUserContext)
	const { values, handleChange, setValues } = useForm({ name: '', about: '' })

	useEffect(() => {
		setValues({ name: userData?.name, about: userData?.about })
	}, [userData, isOpen, setValues])

	const handleSubmit = (event) => {
		event.preventDefault()
		handleEditProfileSubmit({ name: values["name"], about: values["about"] })
	}

	if (values["name"] === undefined) return null

	return (
		<PopupWithForm
			title='Редактировать профиль'
			name='profileEdit'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			buttonText={isLoading ? "В процессе..." : "Сохранить"}>
			<input
				placeholder='Имя'
				className='input popup__name'
				name='name'
				id='popup__name_profileEdit'
				type='text'
				required
				minLength='2'
				maxLength='40'
				value={values['name']}
				onChange={handleChange}
			/>
			<span className='popup__name-error message-error'></span>
			<input
				placeholder='Род деятельности'
				name='about'
				className='input popup__occupation'
				id='popup__occupation'
				type='text'
				required
				minLength='2'
				maxLength='200'
				value={values['about']}
				onChange={handleChange}
			/>
			<span className='popup__occupation-error message-error'></span>
		</PopupWithForm>
	)
}