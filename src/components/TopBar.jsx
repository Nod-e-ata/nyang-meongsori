import React from 'react';
import './TopBar.css';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.svg';
import userIcon from '../assets/user-icon.svg';

const TopBar = () => {
    const navigate = useNavigate();

    return (
        <div className="topbar">
            <div className="left-section">
                <div className="logo">
                    <Link to="/">
                        <img src={logo} alt="Logo" />
                    </Link>
                </div>
                <nav className="topbar-nav">
                    <Link to="/profile/dog">반려견 프로필</Link>
                    <Link to="/profile/cat">반려묘 프로필</Link>
                </nav>
            </div>
            <div className="topbar-user-icon" onClick={() => navigate('/mypage')}>
                <img src={userIcon} alt="User Icon" />
            </div>
        </div>
    );
};

export default TopBar;