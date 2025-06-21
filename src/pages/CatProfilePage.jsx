import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import FloatingButton from '../components/FloatingButton';
import underIcon from '../assets/under-icon.svg';
import CatProfileCard from '../components/CatProfileCard';
import './CatProfilePage.css';

function CatProfilePage() {
    const navigate = useNavigate();

    const handleFloatingButtonClick = () => {
      navigate('/pet-form');
    };

  return (
    <div className="cat-profile-container">
      <Topbar />

      <div className="cat-section">
        <div className="cat-title-wrapper">
            <div className="cat-title">고양이 프로필 리스트</div>

            <div className="cat-filter-group">
                <FilterDropdown label="지역" options={["서울", "인천", "대전", "대구", "부산", "경기", "광주", "울산", "제주"]} />
                <FilterDropdown label="성별" options={["여자", "남자"]} />
                <FilterDropdown label="중성화 여부" options={["중성화 O", "중성화 X"]} />
            </div>
        </div>

        <div className="cat-profile">
          {[...Array(15)].map((_, idx) => (
            <CatProfileCard
              key={idx}
              name={`이름 ${idx + 1}`}
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

function FilterDropdown({ label, options }) {
  const [selected, setSelected] = useState(label);
  const [open, setOpen] = useState(false);

  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
  };

  return (
    <div className="cat-filter-dropdown">
      <div className="cat-filter-button" onClick={() => setOpen(!open)}>
        <span className="cat-filter-text">{selected}</span>
        <img src={underIcon} alt="Dropdown Icon" className="cat-filter-icon" />
      </div>
      {open && (
        <div className="cat-dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="cat-dropdown-option"
              onClick={() => handleSelect(option)}
            >
              {option}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CatProfilePage;