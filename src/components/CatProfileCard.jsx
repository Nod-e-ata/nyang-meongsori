import React from 'react';
import './CatProfileCard.css';
import catImg from '../assets/cat-placeholder.svg';
import { useNavigate } from 'react-router-dom';

function CatProfileCard({ name, breedGender, birth, imageUrl, petId }) {
  const navigate = useNavigate();

  const displayImageUrl = imageUrl
    ? `http://localhost:8080${imageUrl}`
    : catImg;

  return (
    <div className="cat-card" onClick={() => navigate(`/pet-profile-detail/${petId}?type=CAT`)}>
      <img
        src={displayImageUrl}
        alt={name}
        className="cat-img"
        onError={(e) => {
          console.error("Image loading error for:", name, e);
          e.target.src = catImg;
        }}
      />
      <div className="cat-name">{name}</div>
      <div className="cat-info">{breedGender}</div>
      <div className="cat-info">{birth}</div>
    </div>
  );
}

export default CatProfileCard;