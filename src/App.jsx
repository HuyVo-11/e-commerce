import './App.css'
import RootLayout from './components/Layout/RootLayout'

import AppRouter from './router/Routers'

function App() {
	return (
		<RootLayout>
            <AppRouter />
        </RootLayout>
	)
}

export default App
