import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyPage from './pages/MyPage';
import PetForm from './pages/PetForm';
import DogProfilePage from './pages/DogProfilePage';
import CatProfilePage from './pages/CatProfilePage';
import PetProfileDetailPage from './pages/PetProfileDetailPage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
        <Route path="/pet-form" element={<PetForm/>}/>
        <Route path="/dog-profile" element={<DogProfilePage />} />
        <Route path="/cat-profile" element={<CatProfilePage />} />
        <Route path="/pet-profile-detail" element={<PetProfileDetailPage />} />
      </Routes>
    </Router>
  );
};

export default App;