import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Loginn from './Pages/Loginn';
import Dashboardd from './Pages/Dashboardd';
import Registrationn from './Pages/Registrationn';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registrationn />} />
      <Route path="/login" element={<Loginn />} />
      <Route path="/dashboard" element={<Dashboardd />} />
    </Routes>
  )
}

export default App;