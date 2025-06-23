import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import Topbar from '../components/Topbar';
import './PetProfileDetailPage.css';
import userIcon from '../assets/user-icon.svg';
import dogPlaceholder from '../assets/dog-placeholder.svg';
import catPlaceholder from '../assets/cat-placeholder.svg';

const formatPhoneNumber = (phoneNumber) => {
  if (!phoneNumber) return '정보 없음';

  const cleaned = ('' + phoneNumber).replace(/\D/g, '');

  const match = cleaned.match(/^(\d{3})(\d{3,4})(\d{4})$/);
  
  if (match) {
    return `${match[1]}-${match[2]}-${match[3]}`;
  }
  return phoneNumber;
};

function PetProfileDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [petInfo, setPetInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPetDetail = async () => {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');

      if (!token) {
        alert('로그인이 필요합니다.');
        navigate('/login');
        return;
      }

      try {
        const queryParams = new URLSearchParams(location.search);
        const petType = queryParams.get('type'); 

        if (!petType) {
          throw new Error("반려동물 타입을 알 수 없습니다. 잘못된 접근입니다.");
        }

        let apiUrl = '';
        if (petType.toUpperCase() === 'DOG') {
          apiUrl = `http://localhost:8080/api/pets/dog/${id}`;
        } else if (petType.toUpperCase() === 'CAT') {
          apiUrl = `http://localhost:8080/api/pets/cat/${id}`;
        } else {
          throw new Error("유효하지 않은 반려동물 타입입니다.");
        }

        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        });

        if (!response.ok) {
          if (response.status === 401 || response.status === 403) {
            alert('세션이 만료되었거나 권한이 없습니다. 다시 로그인해주세요.');
            localStorage.removeItem('token');
            navigate('/login');
            return;
          } else if (response.status === 404) {
            throw new Error(`해당 ${petType} 정보를 찾을 수 없습니다: ${id}`);
          } else {
            const errorData = await response.json();
            throw new Error(errorData.message || `반려동물 정보를 불러오는데 실패했습니다: ${response.status}`);
          }
        }
        
        const apiResponse = await response.json();
        const petData = apiResponse.data;

        if (!petData) {
            throw new Error("해당 ID의 반려동물 정보를 찾을 수 없습니다.");
        }
        
        console.log(`Fetched ${petType} Data:`, petData);
        setPetInfo({ ...petData, type: petType.toUpperCase() });

      } catch (err) {
        console.error('반려동물 상세 정보 로딩 중 치명적인 에러 발생:', err);
        if (err.message && (err.message.includes('401') || err.message.includes('403') || err.message.includes("세션이 만료되었습니다"))) {
            alert('세션이 만료되었거나 권한이 없습니다. 다시 로그인해주세요.');
            localStorage.removeItem('token');
            navigate('/login');
        } else if (err.message.includes("Failed to fetch")) {
            alert('서버와 통신 중 문제가 발생했습니다. 백엔드 서버가 실행 중인지 확인하세요.');
            setError(err.message);
        }
        else {
            setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchPetDetail();
  }, [id, navigate, location.search]);

  if (loading) {
    return (
      <div className="pet-container">
        <Topbar />
        <div className="detail-container">정보를 로딩 중입니다...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="pet-container">
        <Topbar />
        <div className="detail-container">에러 발생: {error}</div>
      </div>
    );
  }

  if (!petInfo) {
      return (
        <div className="pet-container">
            <Topbar />
            <div className="detail-container">반려동물 정보를 찾을 수 없습니다.</div>
        </div>
      );
  }

  const displayImageUrl = petInfo.imageUrl
    ? `http://localhost:8080${petInfo.imageUrl}`
    : (petInfo.type === 'DOG' ? dogPlaceholder : catPlaceholder); 

  const displayGender = petInfo.gender === 'MALE' ? '남자' : petInfo.gender === 'FEMALE' ? '여자' : '알 수 없음';
  const displayNeutered = petInfo.isNeutered ? 'O' : 'X';
  
  return (
    <div className="pet-container">
      <Topbar />
      <div className="detail-container">
        <div className="detail-wrapper">
            <div className="detail-left-section">
                <img
                    src={displayImageUrl}
                    alt={petInfo.name}
                    className="detail-pet-image"
                    onError={(e) => { e.target.src = (petInfo.type === 'DOG' ? dogPlaceholder : catPlaceholder); }}
                />
                <div className="detail-icon-text-wrapper">
                    <img src={userIcon} alt="user icon" className="detail-user-icon" />
                    <span className="detail-user-name">{petInfo.ownerUsername || '알 수 없음'}</span> 
                </div>
            </div>
            
             <div className="detail-right-section">
                <div className="detail-pet-name">{petInfo.name}</div>
                <div className="detail-pet-info">지역: {petInfo.location || '정보 없음'}</div>
                <div className="detail-pet-info">성별: {displayGender}</div>
                <div className="detail-pet-info">중성화 여부: {displayNeutered}</div>
                <div className="detail-pet-info">종: {petInfo.breed || '정보 없음'}</div>
                <div className="detail-pet-info">생년월일: {petInfo.birthDate || '정보 없음'}</div>
                {/* 연락처 표시 부분 수정 */}
                <div className="detail-pet-contact">연락처: {formatPhoneNumber(petInfo.ownerPhoneNumber)}</div> 
                
                <div className="detail-pet-detail-title">상세 정보</div>
                <div className="detail-box">
                    <p className="detail-text">{petInfo.description || '상세 정보가 없습니다.'}</p>
                </div>
             </div>
        </div>
      </div>
    </div>
  );
}

export default PetProfileDetailPage;