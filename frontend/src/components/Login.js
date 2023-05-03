import { Header } from "./Header"
import { useNavigate } from "react-router-dom"
import { auth } from "../utils/AuthAPI"
import { useContext, useEffect, useState } from "react"
import { TokenContext } from "../contexts/TokenContext"
import { InfoTooltip } from "./InfoTooltip"
import fail from "../images/fail.svg"

export const Login = (props) => {
	const navigate = useNavigate()
	const { setToken, setEmail } = useContext(TokenContext)
	const [isFailActive, setIsFailActive] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	useEffect(() => {
		const closeByEscape = (e) => {
			if (e.key === 'Escape') {
				onCloseFail('manualClosing')
			}
		}
		document.addEventListener('keydown', closeByEscape);
		return () => {
			document.removeEventListener('keydown', closeByEscape);
		}
	}, [isFailActive])

	const onSubmitHandler = async (e) => {
		e.preventDefault()
		setIsLoading(true)
		try {
			const res = await auth.signIn(formData)
			const { token } = res
			setIsLoading(false)
			setToken(token)
			setEmail(formData.email)
			navigate('/', { replace: true })
		} catch (error) {
			setIsLoading(false)
			setIsFailActive(true)
		}
	}

	const onChangeHandler = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			...{ [name]: value }
		})
	}
	
	const onCloseFail = (e) => {
		if (e.target === e.currentTarget || e === 'manualClosing') {
			setIsFailActive(false)
		}
	}

	return (
		<div className='page'>
			<Header
				title={'Регистрация'}
				to={'/sign-up'}
			/>
			<div className='page__signUp'>
				<h1 className="page__title">Вход</h1>
				<form className="page__inputs"
					onChange={onChangeHandler}
					onSubmit={onSubmitHandler}
				>
					<input
						type="email"
						placeholder='Email'
						className='input input_type_empty'
						name='email'
						value={formData.email}
						onChange={onChangeHandler}
					/>
					<input
						type="password"
						placeholder='Пароль'
						className='input input_type_empty'
						name='password'
						value={formData.password}
						onChange={onChangeHandler}
					/>
					<button
						disabled={isLoading}
						className="button button_type_auth"
						type="submit"
					>
						{isLoading ? "В процессе..." : "Войти"}
					</button>
				</form>
			</div>

			<InfoTooltip
				text={'Что-то пошло не так! Попробуйте ещё раз.'}
				link={fail}
				alt={"fail icon"}
				isActive={isFailActive}
				onClose={onCloseFail}
			/>
		</div>
	)

}