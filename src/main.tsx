import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { Web3Provider } from './providers/RainbowKitProvider'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Web3Provider>
      <App />
    </Web3Provider>
  </React.StrictMode>,
)
