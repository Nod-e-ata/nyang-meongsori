import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './MyPage.css';
import TopBar from '../components/Topbar';
import DogProfileCard from '../components/DogProfileCard';
import CatProfileCard from '../components/CatProfileCard';
import userIcon from '../assets/user-icon.svg';

const MyPage = () => {
  const [userInfo, setUserInfo] = useState(null);
  const [dogs, setDogs] = useState([]);
  const [cats, setCats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const formatPhoneNumber = (num) => {
    if (!num) return '';
    const cleanNum = num.replace(/\D/g, '');
    
    if (cleanNum.length === 10) {
      return cleanNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (cleanNum.length === 11) {
      return cleanNum.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3');
    } else if (cleanNum.length === 9) {
      return cleanNum.replace(/(\d{2})(\d{3,4})(\d{4})/, '$1-$2-$3');
    }
    return num;
  };


  useEffect(() => {
    const fetchUserInfo = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      try {
        const response = await fetch('http://localhost:8080/api/user/me', { 
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          if (response.status === 401) {
            alert('세션이 만료되었습니다. 다시 로그인해주세요.');
            localStorage.removeItem('token');
            navigate('/login');
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || `사용자 정보를 불러오는데 실패했습니다: ${response.status}`);
          }
        }

        const apiResponse = await response.json();
        console.log("백엔드로부터 받은 ApiResponse:", apiResponse);

        const userData = apiResponse.data;
        console.log("파싱된 실제 사용자 및 반려동물 정보 (userData):", userData);

        setUserInfo({
            id: userData.username,
            phone: userData.phoneNumber,
            dogCount: userData.dogCount,
            catCount: userData.catCount,
        });
        setDogs(userData.dogs || []);
        setCats(userData.cats || []);

      } catch (err) {
        console.error('사용자 정보 로딩 에러:', err);
        setError(err.message);
        if (err.message.includes("Failed to fetch")) {
          alert("서버와 통신할 수 없습니다. 백엔드 서버가 실행 중인지 확인하세요.");
          localStorage.removeItem('token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserInfo();
  }, [navigate]);

  if (loading) {
    return <div className="mypage-container">정보를 로딩 중입니다...</div>;
  }

  if (error) {
    return <div className="mypage-container">에러 발생: {error}</div>;
  }

  if (!userInfo) {
      return <div className="mypage-container">사용자 정보를 찾을 수 없습니다.</div>;
  }

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
              <span className="mypage-info-value">{userInfo.dogCount}마리</span>
            </div>
            <div className="mypage-info-row">
              <span className="mypage-info-label">반려묘</span>
              <span className="mypage-info-value">{userInfo.catCount}마리</span>
            </div>
            <div className="mypage-info-row">
              <span className="mypage-info-label">전화번호</span>
              <span className="mypage-info-value">
                {userInfo.phone ? formatPhoneNumber(userInfo.phone) : '정보 없음'}
              </span> 
            </div>
          </div>
        </div>

        <section>
          <h2>나의 반려견</h2>
          <div className="pet-list">
            {dogs.length > 0 ? (
              dogs.map((dog) => (
                <DogProfileCard
                  key={dog.id}
                  petId={dog.id} 
                  name={dog.name}
                  breedGender={`${dog.breed} / ${dog.gender === 'MALE' ? '남자' : dog.gender === 'FEMALE' ? '여자' : ''}`}
                  birth={dog.birthDate}
                  imageUrl={dog.imageUrl}
                />
              ))
            ) : (
              <p className="no-pet-message">등록된 반려견이 없습니다.</p>
            )}
          </div>
        </section>

        <section>
          <h2>나의 반려묘</h2>
          <div className="pet-list">
            {cats.length > 0 ? (
              cats.map((cat) => (
                <CatProfileCard
                  key={cat.id}
                  petId={cat.id} 
                  name={cat.name}
                  breedGender={`${cat.breed} / ${cat.gender === 'MALE' ? '남자' : cat.gender === 'FEMALE' ? '여자' : ''}`}
                  birth={cat.birthDate}
                  imageUrl={cat.imageUrl}
                />
              ))
            ) : (
              <p className="no-pet-message">등록된 반려묘가 없습니다.</p>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default MyPage;