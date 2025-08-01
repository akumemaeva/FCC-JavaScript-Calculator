import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
//import './index.css'
//import App from './App.tsx'
//import Markdown from './markdown preview/Markdown.tsx'
//import App from './clock/App.tsx'

//import './drumMachine/DrumApp.css'
//import { DrumApp } from './drumMachine/DrumApp.tsx'

import './calculator/Calculator.css'
import Calculator from './calculator/Calculator.tsx'
//import RandomQuote from './random-quote/RandomQuote.tsx'
//import DrumMachine from './drum-machine/App.tsx'


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    < Calculator/>
  </StrictMode>,
)
