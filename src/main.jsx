import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { SolutionContextProvider } from './context/contextProvider.jsx'

createRoot(document.getElementById('root')).render(
    <SolutionContextProvider>
        <App />
    </SolutionContextProvider>
)
