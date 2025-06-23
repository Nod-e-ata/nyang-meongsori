import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Topbar from '../components/Topbar';
import FloatingButton from '../components/FloatingButton';
import underIcon from '../assets/under-icon.svg';
import CatProfileCard from '../components/CatProfileCard';
import './CatProfilePage.css';
import catPlaceholder from '../assets/cat-placeholder.svg';

function CatProfilePage() {
    const navigate = useNavigate();
    const [cats, setCats] = useState([]);
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

    const fetchCats = async () => {
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
            
            const apiUrl = `http://localhost:8080/api/pets/all-cats?${queryParams.toString()}`;
            console.log("Fetching cats with URL:", apiUrl);

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
                throw new Error(errorData.message || `고양이 목록을 불러오는데 실패했습니다: ${response.status}`);
            }

            const apiResponse = await response.json();
            setCats(apiResponse.data || []); 

        } catch (err) {
            console.error('고양이 목록 로딩 에러:', err);
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
        fetchCats();
    }, [filters, navigate]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [filterType]: value,
        }));
    };

    if (loading) {
        return (
            <div className="cat-profile-container">
                <Topbar />
                <div className="cat-section">
                    <div className="cat-title">고양이 프로필 리스트</div>
                    <div className="cat-profile">정보를 로딩 중입니다...</div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="cat-profile-container">
                <Topbar />
                <div className="cat-section">
                    <div className="cat-title">고양이 프로필 리스트</div>
                    <div className="cat-profile">에러 발생: {error}</div>
                </div>
            </div>
        );
    }

    return (
        <div className="cat-profile-container">
            <Topbar />

            <div className="cat-section">
                <div className="cat-title-wrapper">
                    <div className="cat-title">고양이 프로필 리스트</div>

                    <div className="cat-filter-group">
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

                <div className="cat-profile">
                    {cats.length > 0 ? (
                        cats.map((cat) => (
                            <CatProfileCard
                                key={cat.id}
                                petId={cat.id}
                                name={cat.name}
                                breedGender={`${cat.breed || '알 수 없음'} / ${cat.gender === 'MALE' ? '남자' : cat.gender === 'FEMALE' ? '여자' : ''}`}
                                birth={cat.birthDate}
                                imageUrl={cat.imageUrl || catPlaceholder}
                            />
                        ))
                    ) : (
                        <p className="no-cat-message">등록된 고양이가 없거나, 필터링 결과가 없습니다.</p>
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