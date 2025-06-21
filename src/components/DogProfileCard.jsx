import React from 'react';
import './DogProfileCard.css';
import dogImg from '../assets/dog-placeholder.svg'; 
import { useNavigate } from 'react-router-dom';

function DogProfileCard({ name, breedGender, birth }) {
  const navigate = useNavigate();

  return (
    <div className="dog-card" onClick={() => navigate('/pet-profile-detail')}>
      <img src={dogImg} alt="Dog" className="dog-img" />
      <div className="dog-name">{name}</div>
      <div className="dog-info">{breedGender}</div>
      <div className="dog-info">{birth}</div>
    </div>
  );
}

export default DogProfileCard;