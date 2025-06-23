import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import FloatingButton from '../components/FloatingButton';
import underIcon from '../assets/under-icon.svg';
import DogProfileCard from '../components/DogProfileCard';
import './DogProfilePage.css';
import dogPlaceholder from '../assets/dog-placeholder.svg';

function DogProfilePage() {
    const navigate = useNavigate();
    const [dogs, setDogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        location: '지역',
        gender: '성별',
        neutered: '중성화 여부',
    });

    const handleFloatingButtonClick = () => {
        navigate('/pet-form');
    };

    const fetchDogs = async () => {
        setLoading(true);
        setError(null);

        const token = localStorage.getItem('token');
        if (!token) {
            alert('로그인이 필요합니다.');
            navigate('/login');
            return;
        }

        try {
            const queryParams = new URLSearchParams();

            if (filters.location !== '지역') {
                queryParams.append('location', filters.location);
            }

            if (filters.gender === '남자') {
                queryParams.append('gender', 'MALE');
            } else if (filters.gender === '여자') {
                queryParams.append('gender', 'FEMALE');
            }
            
            if (filters.neutered === '중성화 O') {
                queryParams.append('isNeutered', 'true');
            } else if (filters.neutered === '중성화 X') {
                queryParams.append('isNeutered', 'false');
            }
            
            const apiUrl = `http://localhost:8080/api/pets/all-dogs?${queryParams.toString()}`;
            console.log("Fetching dogs with URL:", apiUrl);

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
                }
                const errorData = await response.json();
                throw new Error(errorData.message || `강아지 목록을 불러오는데 실패했습니다: ${response.status}`);
            }

            const apiResponse = await response.json();
            setDogs(apiResponse.data || []);

        } catch (err) {
            console.error('강아지 목록 로딩 에러:', err);
            setError(err.message);
            if (err.message.includes("Failed to fetch")) {
                alert('서버와 통신 중 문제가 발생했습니다. 백엔드 서버가 실행 중인지 확인하세요.');
            } else if (err.message.includes("세션이 만료되었거나 권한이 없습니다")) {
                localStorage.removeItem('token');
                navigate('/login');
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDogs();
    }, [filters, navigate]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    if (loading) {
        return (
            <div className="dog-profile-container">
                <Topbar />
                <div className="dog-section">
                    <div className="dog-title">강아지 프로필 리스트</div>
                    <div className="dog-profile">정보를 로딩 중입니다...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="dog-profile-container">
                <Topbar />
                <div className="dog-section">
                    <div className="dog-title">강아지 프로필 리스트</div>
                    <div className="dog-profile">에러 발생: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="dog-profile-container">
            <Topbar />

            <div className="dog-section">
                <div className="dog-title-wrapper">
                    <div className="dog-title">강아지 프로필 리스트</div>

                    <div className="dog-filter-group">
                        <FilterDropdown
                            label={filters.location}
                            options={["지역", "서울", "인천", "대전", "대구", "부산", "경기", "광주", "울산", "제주"]}
                            onSelect={(value) => handleFilterChange('location', value)}
                        />
                        <FilterDropdown
                            label={filters.gender}
                            options={["성별", "남자", "여자"]}
                            onSelect={(value) => handleFilterChange('gender', value)}
                        />
                        <FilterDropdown
                            label={filters.neutered}
                            options={["중성화 여부", "중성화 O", "중성화 X"]}
                            onSelect={(value) => handleFilterChange('neutered', value)}
                        />
                    </div>
                </div>
                <div className="dog-profile">
                    {dogs.length > 0 ? (
                        dogs.map((dog) => (
                            <DogProfileCard
                                key={dog.id}
                                petId={dog.id}
                                name={dog.name}
                                breedGender={`${dog.breed || '알 수 없음'} / ${dog.gender === 'MALE' ? '남자' : dog.gender === 'FEMALE' ? '여자' : ''}`}
                                birth={dog.birthDate}
                                imageUrl={dog.imageUrl || dogPlaceholder}
                            />
                        ))
                    ) : (
                        <p className="no-dog-message">등록된 강아지가 없거나, 필터링 결과가 없습니다.</p>
                    )}
                </div>
            </div>
            <FloatingButton onClick={handleFloatingButtonClick} />
        </div>
    );
}

function FilterDropdown({ label, options, onSelect }) {
  const [selected, setSelected] = useState(label);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setSelected(label);
  }, [label]);


  const handleSelect = (option) => {
    setSelected(option);
    setOpen(false);
    onSelect(option);
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