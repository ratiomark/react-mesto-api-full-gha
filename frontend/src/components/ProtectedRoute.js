import { useContext } from "react"
import { Navigate } from "react-router-dom"
import { TokenContext } from "../contexts/TokenContext"

export const ProtectedRoute = ({ children }) => {
	const { token } = useContext(TokenContext)
	console.log(token)
	return token ? children : <Navigate to='/sign-in' replace />
}