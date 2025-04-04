import './App.css'
import React from 'react'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login/Login.jsx"
import Report from './components/Report/Report.jsx'
import Profile from './components/Profile/Profile.jsx'

const App = () => {
  return (
    <Router> {/* Wrap everything in Router */}
      <div>
        <Routes>
          <Route path="/login" element={<Login />} /> 
          <Route path="/profile" element={<Profile />} /> 
          <Route path="/report" element={<Report />} />
          
          <Route path="/" element={<Profile />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;