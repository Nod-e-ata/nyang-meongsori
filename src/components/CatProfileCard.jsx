import React from 'react';
import './CatProfileCard.css';
import catImg from '../assets/cat-placeholder.svg'; 
import { useNavigate } from 'react-router-dom';

function CatProfileCard({ name, breedGender, birth }) {
  const navigate = useNavigate();
  
  return (
    <div className="cat-card" onClick={() => navigate('/pet-profile-detail')}>
      <img src={catImg} alt="Cat" className="cat-img" />
      <div className="cat-name">{name}</div>
      <div className="cat-info">{breedGender}</div>
      <div className="cat-info">{birth}</div>
    </div>
  );
}

export default CatProfileCard;