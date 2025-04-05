import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.jsx"
import Report from './components/Report/Report.jsx'
import Profile from './components/Profile/Profile.jsx'
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Navbar from './components/Navbar.jsx';
import Services from './components/Services.jsx';
import NearestHosp from './components/NearestHosp.jsx';

const App = () => {
  return (
    <Router> {/* Wrap everything in Router */}
      <div>
        <Navbar />
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/report" element={<Report />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/help" element={<NearestHosp />} />
          
          
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;