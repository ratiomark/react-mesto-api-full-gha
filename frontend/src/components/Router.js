import { useCallback } from "react"
import { Route, Routes, Navigate } from "react-router-dom"
import { Login } from "./Login"
import { ProtectedRoute } from "./ProtectedRoute"
import { Register } from "./Register"
import App from "./App"

const routeConfig = {
	LOGIN: {
		path: '/sign-in',
		element: <Login />,
	},
	REGISTER: {
		path: 'sign-up',
		element: <Register />,
	},
	MAIN: {
		path: '/',
		element: <App />,
		authOnly: true
	},
	OTHER: {
		path: '*',
		element: <Navigate to="/" replace />,
		authOnly: true
	}
}


export const Router = () => {

	const renderWithWrapper = useCallback((route) => {
		return (
			<Route
				path={route.path}
				key={route.path}
				element={route.authOnly
					? <ProtectedRoute>{route.element}</ProtectedRoute>
					: route.element
				}
			/>
		)
	}, [])

	const routes = Object.values(routeConfig).map(renderWithWrapper)

	return (
		<Routes>
			{routes}
		</Routes>
	)
}