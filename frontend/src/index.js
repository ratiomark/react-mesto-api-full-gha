import React from 'react'
import ReactDOM from 'react-dom/client'
import './pages/index.css'
import { CurrentUserProvider } from './contexts/CurrentUserContext'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './components/Router'
import { TokenContextProvider } from './contexts/TokenContext'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<BrowserRouter>
		<TokenContextProvider>
			<CurrentUserProvider>
				<Router />
			</CurrentUserProvider>
		</TokenContextProvider>
	</BrowserRouter>
)
