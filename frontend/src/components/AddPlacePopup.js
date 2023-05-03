import { useEffect } from "react"
import { useForm } from "../hooks/useForm"
import { PopupWithForm } from "./PopupWithForm"

export const AddPlacePopup = (props) => {
	const {
		handleAddPlaceSubmit,
		isOpen,
		onClose,
		isLoading
	} = props

	const { values, handleChange, setValues } = useForm({ name: '', link: '' })

	useEffect(() => {
		setValues({ name: '', link: '' })
	}, [isOpen])


	const handleSubmit = (event) => {
		event.preventDefault()
		handleAddPlaceSubmit({ name: values['name'], link: values['link'] })
	}

	return (
		<PopupWithForm
			title='Новое место'
			name='add-card'
			isOpen={isOpen}
			onClose={onClose}
			onSubmit={handleSubmit}
			buttonText={isLoading ? "В процессе..." : "Создать"}>
			<input
				className='input popup__name'
				name='name'
				id='popup__name-new-card'
				type='text'
				required
				placeholder='Название'
				minLength='2'
				maxLength='30'
				value={values['name']}
				onChange={handleChange}
			/>
			<span className='popup__name-new-card-error message-error'></span>
			<input
				className='input popup__link'
				name='link'
				id='popup__link'
				type='url'
				required
				placeholder='Ссылка на картинку'
				value={values['link']}
				onChange={handleChange}
			/>
			<span className='popup__link-error message-error'></span>
		</PopupWithForm>
	)
}


