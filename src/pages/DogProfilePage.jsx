import React, { useState } from 'react';
import Topbar from '../components/Topbar';
import FloatingButton from '../components/FloatingButton';
import underIcon from '../assets/under-icon.svg';
import DogProfileCard from '../components/DogProfileCard';
import './DogProfilePage.css';

function DogProfilePage() {
  return (
    <div className="dog-profile-container">
      <Topbar />

      <div className="dog-section">
        <div className="dog-title-wrapper">
            <div className="dog-title">강아지 프로필 리스트</div>

            <div className="dog-filter-group">
                <FilterDropdown label="지역" options={["서울", "인천", "대전", "대구", "부산", "경기", "광주", "울산", "제주"]} />
                <FilterDropdown label="성별" options={["여자", "남자"]} />
                <FilterDropdown label="중성화 여부" options={["중성화 O", "중성화 X"]} />
            </div>
        </div>
        <div className="dog-profile">
          {[...Array(15)].map((_, idx) => (
            <DogProfileCard
              key={idx}
              name={`이름 ${idx + 1}`}
              breedGender="종 / 성별"
              birth="생년월일"
            />
          ))}
        </div>
      </div>

      <FloatingButton />
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
    <div className="dog-filter-dropdown">
      <div className="dog-filter-button" onClick={() => setOpen(!open)}>
        <span className="dog-filter-text">{selected}</span>
        <img src={underIcon} alt="Dropdown Icon" className="dog-filter-icon" />
      </div>
      {open && (
        <div className="dog-dropdown-options">
          {options.map((option, index) => (
            <div
              key={index}
              className="dog-dropdown-option"
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

export default DogProfilePage;