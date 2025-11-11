import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-react'
import App from './App.jsx'
import './index.css'
import { AppProvider } from './context/AppContext.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
if (!PUBLISHABLE_KEY) throw new Error('Missing Publishable Key')

createRoot(document.getElementById('root')).render(
  <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
    <ClerkLoaded>
      <BrowserRouter>
        <AppProvider>
          <App />
          <ToastContainer position="top-right" autoClose={1500} />
        </AppProvider>
      </BrowserRouter>
    </ClerkLoaded>
  </ClerkProvider>
)
