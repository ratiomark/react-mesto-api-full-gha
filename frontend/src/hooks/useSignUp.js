import { useContext, useState } from "react"
import { TokenContext } from "../contexts/TokenContext"
import { auth } from "../utils/AuthAPI";

export function useSignUp() {
	const { setToken } = useContext(TokenContext)
	const [isLoading, setIsLoading] = useState(false)
	const sleep = m => new Promise(r => setTimeout(r, m))

	const signUp = async (formData, showProblem, showSuccess) => {
		setIsLoading(true)
		try {
			let res = await auth.signUp(formData)
			res = await auth.signIn(formData)
			const token = res.token
			setIsLoading(false)
			setToken(token)
			showSuccess()

		} catch (error) {
			setIsLoading(false)
			showProblem()
		}
	}

	return { signUp, isLoading };
}