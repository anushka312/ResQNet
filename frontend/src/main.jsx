import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import "leaflet/dist/leaflet.css";
import { AuthProvider } from './components/context/AuthContext.jsx';
import App from './App.jsx'
import { CrisisProvider } from './CrisisContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CrisisProvider>
    <AuthProvider>
    
      <App />
    
    </AuthProvider>
    </CrisisProvider>
  </StrictMode>,
)
