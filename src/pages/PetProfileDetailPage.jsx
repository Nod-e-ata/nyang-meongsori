import React from 'react';
import Topbar from '../components/Topbar';
import './PetProfileDetailPage.css';
import userIcon from '../assets/user-icon.svg';
import petPlaceholder from '../assets/dog-placeholder.svg';

function PetProfileDetailPage() {
  return (
    <div className="pet-container">
      <Topbar />
      <div className="detail-container">
        <div className="detail-wrapper">
            <div className="detail-left-section">
                <img
                    src={petPlaceholder}
                    alt="pet"
                    className="detail-pet-image"
                />
                <div className="detail-icon-text-wrapper">
                    <img src={userIcon} alt="user icon" className="detail-user-icon" />
                    <span className="detail-user-name">user</span>
                </div>
            </div>
            
             <div className="detail-right-section">
                <div className="detail-pet-name">이름</div>
                <div className="detail-pet-info">지역</div>
                <div className="detail-pet-info">성별</div>
                <div className="detail-pet-info">중성화 여부</div>
                <div className="detail-pet-info">종</div>
                <div className="detail-pet-info">생년월일</div>
                <div className="detail-pet-contact">010-0000-0000</div>
                <div className="detail-pet-detail-title">상세 정보</div>
                <div className="detail-box">
                    <p className="detail-text">상세 정보 칸입니다</p>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}

export default PetProfileDetailPage;