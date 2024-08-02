// import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import About from './pages/About'
import Community from './pages/Community'
import Action from './pages/Action'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import './styling/App.css'


const App = () => {
  return (
    <div>
      <h1 className="main">AASiA @ Williams</h1>
      <hr />
      <Navbar />
      <hr />
      <div className="main">
        <Routes >
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
          <Route path='/community/*' element={<Community />} />
          <Route path='/action' element={<Action />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
