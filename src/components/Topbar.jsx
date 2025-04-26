import React from 'react';
import './topbar.css';

import logo from '../assets/logo.svg';
import userIcon from '../assets/user-icon.svg';

function Topbar() {
  return (
    <div className="topbar">
      <img src={logo} alt="Logo" className="logo" />
      <div className="menu">
        <span className="menu-item">반려견 프로필</span>
        <span className="menu-item">반려묘 프로필</span>
      </div>
      <img src={userIcon} alt="User Icon" className="user-icon" />
    </div>
  );
}

export default Topbar;
