export const InfoTooltip = (props) => {
	const {
		text,
		link,
		alt,
		isActive,
		onClose
	} = props

	return (
		<div
			onClick={onClose}
			className={`popup popup_type_toolTip ${isActive ? 'popup_active' : null}`}
		>
			<div className="popup__container popup__container_type_toolTip">
				<img
					src={link}
					alt={alt}
					className="popup__tooltip-icon"
				/>
				<h2 className="popup__tooltip-text">{text}</h2>
				<button
					onClick={onClose}
					type="button"
					className="popup__close-button button"
				/>
			</div>
		</div>
	)
}