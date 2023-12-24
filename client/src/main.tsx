import React from 'react'
import ReactDOM from 'react-dom/client'
import { GlobalStateProvider } from './utils/Context.tsx'
import App from './App.tsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <GlobalStateProvider>
      <App />
    </GlobalStateProvider>
  </React.StrictMode>,
)
