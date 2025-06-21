import React from 'react';
import plusIcon from '../assets/plus-icon.svg';
import './FloatingButton.css';

function FloatingButton({ onClick }) {
  return (
    <button className="floating-button" onClick={onClick}>
      <img src={plusIcon} alt="Plus Icon" className="plus-icon" />
    </button>
  );
}

export default FloatingButton;