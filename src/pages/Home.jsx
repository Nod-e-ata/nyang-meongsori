import React, { useState, useEffect } from 'react';
import './Home.css';
import Topbar from '../components/Topbar';
import { useNavigate } from 'react-router-dom';

import userIcon from '../assets/user-icon.svg';
import banner from '../assets/banner.svg';
import DogProfileCard from '../components/DogProfileCard';
import CatProfileCard from '../components/CatProfileCard';
import FloatingButton from '../components/FloatingButton';
import dogImg from '../assets/dog-placeholder.svg';
import catImg from '../assets/cat-placeholder.svg';

function Home() {
  const navigate = useNavigate();
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [userInfo, setUserInfo] = useState(null);

  const handleFloatingButtonClick = () => {
    navigate('/pet-form');
  };

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      setError(null);

      try {
        const token = localStorage.getItem('token');
        console.log("Home.jsx: 현재 localStorage에 저장된 토큰:", token);

        if (!token) {
          console.log("Home.jsx: 토큰 없음. 로그인 페이지로 리디렉션합니다.");
          navigate('/login');
          return;
        }

        console.log("Home.jsx: 토큰 있음. 사용자 정보를 가져옵니다.");
        const userResponse = await fetch('/api/user/me', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!userResponse.ok) {
          console.warn(`Home.jsx: 사용자 정보 요청 실패: ${userResponse.status} ${userResponse.statusText}`);
          if (userResponse.status === 401 || userResponse.status === 403) {
            console.warn("Home.jsx: 인증 실패 또는 권한 없음. 유효하지 않은 토큰 제거 후 로그인 페이지로 이동합니다.");
            localStorage.removeItem('token');
            navigate('/login');
            return;
          }
          throw new Error(`사용자 정보를 불러오는데 실패했습니다: ${userResponse.status}`);
        }
        
        const userApiResponse = await userResponse.json();
        console.log("Home.jsx: 사용자 정보 성공적으로 가져옴:", userApiResponse.data); 
        setUserInfo(userApiResponse.data); 

        const dogResponse = await fetch('/api/pets/all-dogs', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!dogResponse.ok) {
          throw new Error(`강아지 목록을 불러오는데 실패했습니다: ${dogResponse.status}`);
        }
        const dogApiResponse = await dogResponse.json();
        setDogs(dogApiResponse.data ? dogApiResponse.data.slice(0, 5) : []); 

        const catResponse = await fetch('/api/pets/all-cats', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!catResponse.ok) {
          throw new Error(`고양이 목록을 불러오는데 실패했습니다: ${catResponse.status}`);
        }
        const catApiResponse = await catResponse.json();
        setCats(catApiResponse.data ? catApiResponse.data.slice(0, 5) : []); 

      } catch (err) {
        console.error('Home.jsx: 데이터 로딩 중 치명적인 에러 발생:', err);
        setError(err.message);
        localStorage.removeItem('token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchAllData();
  }, [navigate]);

  if (loading || userInfo === null) { 
    console.log("Home.jsx: 로딩 중 또는 userInfo가 아직 null입니다.");
    return (
      <div className="home-container">
        <Topbar />
        <div className="content-wrapper">정보를 로딩 중입니다...</div>
      </div>
    );
  }

  if (error) {
    console.error("Home.jsx: 에러 발생 상태입니다.");
    return (
      <div className="home-container">
        <Topbar />
        <div className="content-wrapper">에러 발생: {error}</div>
      </div>
    );
  }

  console.log("Home.jsx: userInfo가 로드되어 렌더링됩니다:", userInfo);

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

          <div className="user-name">{userInfo.username || '사용자'}</div> 
          <div className="info-row">
            <span className="info-label">반려견 </span>
            <span className="info-value">{userInfo.dogCount || 0}마리</span> 
          </div>
          <div className="info-row">
            <span className="info-label">반려묘 </span>
            <span className="info-value">{userInfo.catCount || 0}마리</span> 
          </div>
        </div>

        <img src={banner} alt="Banner" className="home-banner" />
      </div>

      <div className="recommendation-section">
        <div className="recommendation-title">강아지 프로필 추천</div>
        <div className="dog-list">
          {dogs.length > 0 ? (
            <> 
              {dogs.map((dog) => (
                <DogProfileCard
                  key={dog.id}
                  petId={dog.id}
                  name={dog.name}
                  breedGender={`${dog.breed || '알 수 없음'} / ${dog.gender === 'MALE' ? '남자' : dog.gender === 'FEMALE' ? '여자' : ''}`}
                  birth={dog.birthDate}
                  imageUrl={dog.imageUrl || dogImg} 
                />
              ))}
            </>
          ) : (
            <p className="no-pets-message">등록된 강아지가 없습니다.</p> 
          )}
        </div>
      </div>

      <div className="recommendation-section">
        <div className="recommendation-title">고양이 프로필 추천</div>
        <div className="cat-list">
          {cats.length > 0 ? (
            <>
              {cats.map((cat) => (
                <CatProfileCard
                  key={cat.id}
                  petId={cat.id}
                  name={cat.name}
                  breedGender={`${cat.breed || '알 수 없음'} / ${cat.gender === 'MALE' ? '남자' : cat.gender === 'FEMALE' ? '여자' : ''}`}
                  birth={cat.birthDate}
                  imageUrl={cat.imageUrl || catImg} 
                />
              ))}
            </>
          ) : (
            <p className="no-pets-message">등록된 고양이가 없습니다.</p> 
          )}
        </div>
      </div>
      <FloatingButton onClick={handleFloatingButtonClick} />
    </div>
  );
}

export default Home;