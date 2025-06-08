import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import DogProfilePage from './pages/DogProfilePage';
import CatProfilePage from './pages/CatProfilePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home />}/>
        <Route path="/dog-profile" element={<DogProfilePage />} />
        <Route path="/cat-profile" element={<CatProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App