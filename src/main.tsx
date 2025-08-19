import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './calculator/Calculator.css'
import Calculator from './calculator/Calculator.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    < Calculator/>
  </StrictMode>,
)
