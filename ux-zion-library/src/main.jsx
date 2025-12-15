import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import './i18n'
import { ComponentShowcase } from './pages/ComponentShowcase.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ComponentShowcase />
  </StrictMode>,
)
