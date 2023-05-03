import { useContext } from 'react'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export const Card = (props) => {
	const {
		card,
		onCardClick,
		handleCardLike,
		handleCardDelete,
	} = props
	const { userData } = useContext(CurrentUserContext)
	const { link, likes, name } = card

	const isOwn = userData._id === card.owner._id
	const isLiked = likes.some((i) => i._id === userData._id)

	const onCardLike = () => {
		handleCardLike(card)
	}

	const onCardDelete = (e) => {
		if (e.target === e.currentTarget) {
			handleCardDelete(card._id)
		}
	}

	return (
		<li className='card'>
			{isOwn && (
				<div
					onClick={onCardDelete}
					className='card__delete-icon'></div>
			)}
			<img
				onClick={(e) => {
					if (e.target === e.currentTarget) {
						onCardClick(card)
					}
				}}
				src={link}
				alt={name}
				className='card__image'
			/>
			<div className='card__bottom-wrapper'>
				<h3 className='card__title'>{name}</h3>
				<div className='card__likes-wrapper'>
					<button
						onClick={onCardLike}
						type='button'
						className={`card__like-button ${isLiked ? 'card__like-button_active' : null}`}></button>
					<p className='card__like-counter'>{likes.length}</p>
				</div>
			</div>
		</li>
	)
}
