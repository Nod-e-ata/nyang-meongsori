import React from 'react';
import './home.css';
import Topbar from '../components/Topbar';

import plusIcon from '../assets/plus-icon.svg';
import userIcon from '../assets/user-icon.svg';
import banner from '../assets/banner.svg';

function Home() {
  return (
    <div className="home-container">
      <Topbar />

      <div className="content-wrapper">
        <div className="profile-card">
          <img src={userIcon} alt="User Icon" className="profile-icon"/>
          <div className="user-name">user</div>

          <div className="info-row">
            <span className="info-label">반려견 </span>
            <span className="info-value">1마리</span>
          </div>

          <div className="info-row">
            <span className="info-label">반려묘 </span>
            <span className="info-value">1마리</span>
          </div>
        </div>

        <img src={banner} alt="Banner" className="home-banner" />
      </div>

      <button className="floating-button">
        <img src={plusIcon} alt="Plus Icon" className="plus-icon" />
      </button>
    </div>
  );
}

export default Home;