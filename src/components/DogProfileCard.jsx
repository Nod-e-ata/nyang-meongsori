import React from 'react';
import './DogProfileCard.css';
import dogImg from '../assets/dog-placeholder.svg';
import { useNavigate } from 'react-router-dom';

function DogProfileCard({ name, breedGender, birth, imageUrl, petId }) {
  const navigate = useNavigate();

  const displayImageUrl = imageUrl
    ? `http://localhost:8080${imageUrl}`
    : dogImg;

  return (
    <div className="dog-card" onClick={() => navigate(`/pet-profile-detail/${petId}?type=DOG`)}>
      <img
        src={displayImageUrl}
        alt={name}
        className="dog-img"
        onError={(e) => {
          console.error("Image loading error for:", name, e);
          e.target.src = dogImg;
        }}
      />
      <div className="dog-name">{name}</div>
      <div className="dog-info">{breedGender}</div>
      <div className="dog-info">{birth}</div>
    </div>
  );
}

export default DogProfileCard;