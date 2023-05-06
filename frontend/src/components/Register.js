import { Header } from "./Header"
import { Link, useNavigate } from "react-router-dom"
import { useCallback, useEffect, useState } from "react"
import { useSignUp } from "../hooks/useSignUp"
import { InfoTooltip } from "./InfoTooltip"
import fail from "../images/fail.svg"
import success from "../images/success.svg"

export const Register = (props) => {

	const [isFailActive, setIsFailActive] = useState(false)
	const [isSuccessActive, setIsSuccessActive] = useState(false)
	const { signUp, isLoading } = useSignUp()
	const navigate = useNavigate()

	const [formData, setFormData] = useState({
		email: '',
		password: '',
	})

	const onCloseSuccess = useCallback((e) => {
		if (e.target === e.currentTarget || e === 'manualClosing') {
			setIsSuccessActive(false)
			navigate('/', { replace: true })
		}
	}, [navigate])

	const onCloseFail = useCallback((e) => {
		if (e.target === e.currentTarget || e === 'manualClosing') {
			setIsFailActive(false)
		}
	}, [])

	useEffect(() => {
		const closeByEscape = (e) => {
			if (e.key === 'Escape') {
				isSuccessActive ? onCloseSuccess('manualClosing') : onCloseFail('manualClosing')
			}
		}
		document.addEventListener('keydown', closeByEscape);
		return () => {
			document.removeEventListener('keydown', closeByEscape);
		}
	}, [isFailActive, onCloseFail, onCloseSuccess, isSuccessActive])

	const onSubmitHandler = async (e) => {
		e.preventDefault()
		signUp(
			formData,
			() => setIsFailActive(true),
			() => setIsSuccessActive(true),
		)
	}

	const onChangeHandler = (e) => {
		const { name, value } = e.target
		setFormData({
			...formData,
			...{ [name]: value }
		})
	}


	return (
		<div className='page'>
			<Header title={'Войти'} to={'/sign-in'} />
			<div className='page__signUp'>
				<h1 className="page__title">Регистрация</h1>
				<form className="page__inputs"
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
					>
						{isLoading ? "В процессе..." : "Зарегистрироваться"}
					</button>
				</form>
				<Link className="page__link" to={'/sign-in'}>Уже зарегистрированы? Войти</Link>
			</div>

			<InfoTooltip
				text={'Что-то пошло не так! Попробуйте ещё раз.'}
				link={fail}
				alt={"fail icon"}
				isActive={isFailActive}
				onClose={onCloseFail}
			/>

			<InfoTooltip
				text={'Вы успешно зарегистрировались!'}
				link={success}
				alt={"success icon"}
				isActive={isSuccessActive}
				onClose={onCloseSuccess}
			/>
		</div>
	)
}
