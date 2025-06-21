import React from 'react';
import './topbar.css';
import { useNavigate } from 'react-router-dom';

import logo from '../assets/logo.svg';
import userIcon from '../assets/user-icon.svg';

function Topbar() {
  const navigate = useNavigate();
  
  return (
    <div className="topbar">
      <img
        src={logo}
        alt="Logo"
        className="logo"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/')}
      />
      <div className="menu">
        <span
          className="menu-item"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/dog-profile')}
        >
          반려견 프로필
        </span>
        <span
          className="menu-item"
          style={{ cursor: 'pointer' }}
          onClick={() => navigate('/cat-profile')}
        >
          반려묘 프로필
        </span>
      </div>
      <img
        src={userIcon}
        alt="User Icon"
        className="user-icon"
        style={{ cursor: 'pointer' }}
        onClick={() => navigate('/mypage')}
      />
    </div>
  );
}

export default Topbar;