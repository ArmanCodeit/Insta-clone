import {Routes,Route} from 'react-router';
import Login from './features/auth/pages/Login';
import Register from './features/auth/pages/Register';
import React from 'react'


const AppRoutes = () => {
  return (
    <div>
        <Routes>
          <Route path='/' element={<h1>Welcome to Home Page</h1>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
        </Routes>
    </div>
  )
}

export default AppRoutes