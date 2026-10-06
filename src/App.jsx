import './App.css'

import RootLayout from './components/layout/RootLayout'
import AppRouter from './router/routers'

function App() {
	return (
		<RootLayout>
            <AppRouter />
        </RootLayout>
	)
}

export default App
