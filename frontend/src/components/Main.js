import { useContext } from 'react'
import editButtonSvg from '../images/edit-button.svg'
import addButtonSvg from '../images/add-button.svg'
import { Card } from './Card'
import { CurrentUserContext } from '../contexts/CurrentUserContext'

export const Main = (props) => {
	const {
		onEditProfile,
		onAddPlace,
		onEditAvatar,
		onCardClick,
		handleCardLike,
		handleCardDelete,
		cards,
	} = props

	const { userData } = useContext(CurrentUserContext)

	if (!userData) return <p>Загрузка контента</p>

	return (
		<main className='main page__main'>
			<section className='profile page__profile'>
				<div
					onClick={onEditAvatar}
					className='profile__avatar-wrapper'>
					<img
						src={userData.avatar}
						alt='Аватар пользователя'
						className='profile__avatar'
					/>
				</div>
				<div className='profile__info'>
					<div className='profile__name-wrapper'>
						<h1 className='profile__name'>{userData.name}</h1>
						<button
							onClick={onEditProfile}
							className='button profile__edit-button'
							type='button'>
							<img
								src={editButtonSvg}
								alt='Редактировать профиль'
								className='profile__edit-icon'
							/>
						</button>
					</div>
					<h2 className='profile__occupation'>{userData.about}</h2>
				</div>
				<button
					onClick={onAddPlace}
					className='button button_type_add profile__new-card-button'
					type='button'>
					<img
						src={addButtonSvg}
						alt='добавить карточку'
						className='profile__add-icon'
					/>
				</button>
			</section>

			<section className='cards'>
				<ul className='cards__list'>
					{cards.length > 0
						? cards.map((card) => (
							<Card
								key={card._id}
								card={card}
								onCardClick={onCardClick}
								handleCardLike={handleCardLike}
								handleCardDelete={handleCardDelete}
							/>
						))
						: null
					}
				</ul>
			</section>
		</main>
	)
}
