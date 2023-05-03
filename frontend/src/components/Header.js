import logoSvg from '../images/logo-mesto.svg'
import { Link, useNavigate } from 'react-router-dom'

export const Header = (props) => {
	const {
		to,
		onClickHeaderLink,
		title,
		email
	} = props

	const navigate = useNavigate()

	const link = <Link className="page__link" to={to} onClick={onClickHeaderLink}>{title}</Link>
	const emailBlock = <div><span className='header__email'>{email}</span>{link}</div>

	const onClickLogo = () => navigate('/')

	return (
		<header className="header page__header">
			<img onClick={onClickLogo} src={logoSvg} alt="Лого" className="header__logo" />
			{email
				? emailBlock
				: link
			}
		</header>
	)
}
