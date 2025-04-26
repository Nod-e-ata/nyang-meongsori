import React from 'react';
import './home.css';
import Topbar from '../components/Topbar';

import plusIcon from '../assets/plus-icon.svg';

function Home() {
  return (
    <div className="home-container">
      <Topbar />
      <button className="floating-button">
        <img src={plusIcon} alt="Plus Icon" className="plus-icon" />
      </button>
    </div>
  );
}

export default Home;