import React from 'react'
import { Routes, Route } from "react-router-dom";
import Home from './Pages/Home';
import Loginn from './Pages/Loginn';
import Dashboardd from './Pages/Dashboardd';
import Registrationn from './Pages/Registrationn';
import Registerotpp from './Pages/Registerotpp';
import Monthlyott from './Pages/Monthlyott';
import Alltimerecordss from './Pages/Alltimerecordss';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/register" element={<Registrationn />} />
      <Route path="/verifyotp" element={<Registerotpp />} />
      <Route path="/login" element={<Loginn />} />
      <Route path="/dashboard" element={<Dashboardd />} />
      <Route path="/monthly-ot" element={<Monthlyott />} />
      <Route path="/alltime-records" element={<Alltimerecordss />} />
    </Routes>
  )
}

export default App;