import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import ForgotPassword from './pages/ForgotPassword'
import Profile from './pages/Profile'
import ResetPassword from './pages/ResetPassword'

const App = () => {
  return (
    <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/forgot-password" element={<ForgotPassword/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/reset-password/:token" element={<ResetPassword/>} />
       </Routes>
    </BrowserRouter>
  )
}

export default App