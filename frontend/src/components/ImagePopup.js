export const ImagePopup = (props) => {
	if (!props.selectedCard) {
		return null
	}
	const { link, name } = props.selectedCard

	return (
		<div
			onClick={props.onClose}
			className={`popup popup_type_show-card ${name ? 'popup_active' : null}`}
		>
			<div className="popup__container popup__container_type_show-card">
				<img
					src={link}
					alt={name}
					className="popup__image"
				/>
				<p className="popup__image-description">{name}</p>
				<button
					onClick={props.onClose}
					type="button"
					className="popup__close-button button"
				></button>
			</div>
		</div>
	)
}
