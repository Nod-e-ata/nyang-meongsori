import React from 'react';
import './DogProfileCard.css';
import dogImg from '../assets/dog-placeholder.svg'; 

function DogProfileCard({ name, breedGender, birth }) {
  return (
    <div className="dog-card">
      <img src={dogImg} alt="Dog" className="dog-img" />
      <div className="dog-name">{name}</div>
      <div className="dog-info">{breedGender}</div>
      <div className="dog-info">{birth}</div>
    </div>
  );
}

export default DogProfileCard;