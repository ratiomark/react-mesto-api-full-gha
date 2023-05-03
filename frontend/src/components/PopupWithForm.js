export const PopupWithForm = (props) => {
	const {
		children,
		title,
		name,
		isOpen,
		onClose,
		onSubmit,
		buttonText = 'Сохранить'
	} = props
	return (
		<div
			className={`popup popup_type_${name} ${isOpen ? 'popup_active' : null}`}
			onClick={onClose}
		>
			<div className="popup__container">
				<h4 className={`popup__title ${title === 'Вы уверены?' ? 'popup__title_confirmation' : null}`}>{title}</h4>
				<form
					className="popup__form"
					name={name}
					onSubmit={onSubmit}
				>
					{children}
					<button
						type="submit"
						className="popup__confirmation-button button"
					>
						{buttonText}
					</button>
				</form>
				<button
					onClickCapture={onClose}
					type="button"
					className="popup__close-button button"
				/>
			</div>
		</div>
	)
}
