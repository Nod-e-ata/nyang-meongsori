import React, { useState, useEffect } from 'react';
import './MyPage.css';
import TopBar from '../components/Topbar';
import DogProfileCard from '../components/DogProfileCard';
import CatProfileCard from '../components/CatProfileCard';
import userIcon from '../assets/user-icon.svg';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);

  useEffect(() => {
    const mockData = {
      user: {
        id: 'testUser',
        phone: '010-1234-5678',
      },
      dogs: [
        {
          name: '강아지1',
          breed: '포메라니안',
          gender: '여',
          birthDate: '2025년 05월 12일',
        },
        {
          name: '강아지2',
          breed: '말티즈',
          gender: '남',
          birthDate: '2025년 05월 21일',
        },
        {
          name: '강아지3',
          breed: '푸들',
          gender: '여',
          birthDate: '2025년 06월 4일',
        },
      ],
      cats: [
        {
          name: '박씨',
          breed: '브리티시쇼트헤어',
          gender: '남',
          birthDate: '2023년 05월 30일',
        },
      ],
    };

    setUserInfo(mockData.user);
    setDogs(mockData.dogs);
    setCats(mockData.cats);
  }, []);

  if (!userInfo) return <div>로딩 중...</div>;

  return (
    <div>
      <TopBar />
      <div className="mypage-container">
        <div className="mypage-profile-box">
          <div className="mypage-avatar">
            <img src={userIcon} alt="User Icon" />
          </div>
          <div className="mypage-info">
            <div className="mypage-info-row">
              <span className="mypage-info-label">아이디</span>
              <span className="mypage-info-value">{userInfo.id}</span>
            </div>
            <div className="mypage-info-row">
              <span className="mypage-info-label">반려견</span>
              <span className="mypage-info-value">{dogs.length}마리</span>
            </div>
            <div className="mypage-info-row">
              <span className="mypage-info-label">반려묘</span>
              <span className="mypage-info-value">{cats.length}마리</span>
            </div>
            <div className="mypage-info-row">
              <span className="mypage-info-label">전화번호</span>
              <span className="mypage-info-value">{userInfo.phone}</span>
            </div>
          </div>
        </div>

        <section>
          <h2>나의 반려견</h2>
          <div className="pet-list">
            {dogs.map((dog, index) => (
              <DogProfileCard
                key={index}
                name={dog.name}
                breedGender={`${dog.breed} / ${dog.gender}`}
                birth={dog.birthDate}
              />
            ))}
          </div>
        </section>

        <section>
          <h2>나의 반려묘</h2>
          <div className="pet-list">
            {cats.map((cat, index) => (
              <CatProfileCard
                key={index}
                name={cat.name}
                breedGender={`${cat.breed} / ${cat.gender}`}
                birth={cat.birthDate}
              />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyPage;