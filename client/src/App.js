import React from 'react'

import Headers from './components/Header.jsx/Header'
import Footer from './components/Footer/Footer'
import Routers from './routes/Routers'

import './App.css'

export default function App() {
  return (
    <>
    <div>
    <Headers />
    </div>
    <main>
        <Routers />
    </main>
    <Footer />
    </>
  )
}