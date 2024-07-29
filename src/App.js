import React from 'react'
import Sidebar from './pages/NavbarSidebar'
import { BrowserRouter, Router, Routes, Route } from 'react-router-dom'
import CardsPage from './pages/CardsPage'
const App = () => {
  return (
   <>

<BrowserRouter>
      <Routes>
        <Route path="/Home" element={<Sidebar />} />
        <Route path="/Cards" element={<CardsPage />} />
      </Routes>
    </BrowserRouter>
   </>
  )
}

export default App