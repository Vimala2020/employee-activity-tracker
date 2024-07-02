import React from 'react'
import {Routes,Route} from 'react-router-dom'
import Banner from './pages/Banner'
import Home from './components/Admin/Home'

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Banner />}></Route>
        <Route path='/home' element={<Home />}></Route>
      
      </Routes>
    </div>
  )
}

export default App