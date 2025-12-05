import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/global.css'
import { GameStateProvider } from './game/state'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <GameStateProvider>
      <App />
    </GameStateProvider>
  </React.StrictMode>
)
