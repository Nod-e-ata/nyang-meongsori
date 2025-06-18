import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css'
import Login from './pages/login';
import Signup from './pages/signup';
import MyPage from './pages/mypage';
import PetForm from './pages/pet-form';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/mypage" element={<MyPage/>}/>
        <Route path="/petform" element={<PetForm/>}/>
      </Routes>
    </Router>
  );
};

export default App;