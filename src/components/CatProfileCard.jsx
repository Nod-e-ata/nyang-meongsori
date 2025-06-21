import React from 'react';
import './CatProfileCard.css';
import catImg from '../assets/cat-placeholder.svg'; 

function CatProfileCard({ name, breedGender, birth }) {
  return (
    <div className="cat-card">
      <img src={catImg} alt="Cat" className="cat-img" />
      <div className="cat-name">{name}</div>
      <div className="cat-info">{breedGender}</div>
      <div className="cat-info">{birth}</div>
    </div>
  );
}

export default CatProfileCard;