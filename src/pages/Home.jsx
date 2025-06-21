import React from 'react';
import './Home.css';
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom';

import plusIcon from '../assets/plus-icon.svg';
import userIcon from '../assets/user-icon.svg';
import banner from '../assets/banner.svg';
import DogProfileCard from '../components/DogProfileCard';
import CatProfileCard from '../components/CatProfileCard';
import FloatingButton from '../components/FloatingButton';

function Home() {
  const navigate = useNavigate();

  const handleFloatingButtonClick = () => {
    navigate('/pet-form');
  };

  return (
    <div className="home-container">
      <Topbar />

      <div className="content-wrapper">
        <div className="profile-card">
          <img
          src={userIcon}
          alt="User Icon"
          className="profile-icon"
          onClick={() => navigate('/mypage')}
          style={{ cursor: 'pointer' }}
          />

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

      <div className="recommendation-section">
        <div className="recommendation-title">강아지 프로필 추천</div>
        <div className="dog-list">
          {[...Array(5)].map((_, idx) => (
            <DogProfileCard
              key={idx}
              name="이름"
              breedGender="종 / 성별"
              birth="생년월일"
            />
          ))}
        </div>
      </div>

      <div className="recommendation-section">
        <div className="recommendation-title">고양이 프로필 추천</div>
        <div className="cat-list">
          {[...Array(5)].map((_, idx) => (
            <CatProfileCard
              key={idx}
              name="이름"
              breedGender="종 / 성별"
              birth="생년월일"
            />
          ))}
        </div>
      </div>
      <FloatingButton onClick={handleFloatingButtonClick} />
    </div>
  );
}

export default Home;
