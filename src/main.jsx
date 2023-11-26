import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Auth0Provider } from '@auth0/auth0-react';
import './index.css'
import  { UserProvider } from './Context/user_context.jsx'
import { BrowserRouter as Router } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <Auth0Provider
    domain="dev-c1hlv54q80o0g06g.us.auth0.com"
    clientId='q80xgnOfB4m3x2yl22vPXLS3axUFXWxf'
    authorizationParams={{
      redirect_uri: window.location.origin
    }}
    > 
      <Router>
        <UserProvider>
          <App />
        </UserProvider>
      </Router>
  </Auth0Provider>
    </React.StrictMode>,
)
