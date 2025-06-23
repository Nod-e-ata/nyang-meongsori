import React, { useState, useRef } from 'react';
import './PetForm.css';
import TopBar from '../components/Topbar';

const PetForm = () => {
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState(null);
  const fileInputRef = useRef(null);

  const [selectedType, setSelectedType] = useState(null);
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [breed, setBreed] = useState('');
  const [region, setRegion] = useState('');
  const [gender, setGender] = useState('');
  const [neuter, setNeuter] = useState('');
  const [description, setDescription] = useState('');

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
      setPhotoPreview(URL.createObjectURL(file));
    }
  };

  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleTypeClick = (type) => {
    setSelectedType(type);
    setBreed('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedType) return alert('견/묘를 선택해주세요.');
    if (!name.trim()) return alert('이름을 입력해주세요.');
    if (!birthDate.trim()) return alert('생년월일을 입력해주세요.');
    if (!region) return alert('지역을 선택해주세요.');
    if (!gender) return alert('성별을 선택해주세요.');
    if (!neuter) return alert('중성화 여부를 선택해주세요.');
    if (!photo) return alert('반려동물 사진을 추가해주세요.');

    const serverGender = gender === '남자' ? 'MALE' : 'FEMALE';
    const serverIsNeutered = neuter === '중성화 O' ? 'true' : 'false'; 

    const formData = new FormData();
    
    formData.append('image', photo);
    formData.append('name', name);
    formData.append('birthDate', birthDate);
    formData.append('breed', breed);
    formData.append('location', region);
    formData.append('gender', serverGender);
    formData.append('isNeutered', serverIsNeutered);
    formData.append('description', description);

    const apiUrl = `/api/pets/${selectedType === 'dog' ? 'dogs' : 'cats'}`;
    
    const token = localStorage.getItem('token');

    if (!token) {
      alert('로그인이 필요합니다. 다시 로그인해주세요.');
      return;
    }

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
        body: formData,
      });

      if (response.ok) {
        const result = await response.json();
        console.log('반려동물 등록 성공:', result);
        alert('반려견/묘가 성공적으로 등록되었습니다!');
        resetForm();
      } else {
        const errorData = await response.json();
        console.error('반려동물 등록 실패:', errorData);
        alert(`반려동물 등록 실패: ${errorData.message || '알 수 없는 오류'}`);
      }
    } catch (error) {
      console.error('API 호출 중 오류 발생:', error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  const resetForm = () => {
    setPhoto(null);
    setPhotoPreview(null);
    setSelectedType(null);
    setName('');
    setBirthDate('');
    setBreed('');
    setRegion('');
    setGender('');
    setNeuter('');
    setDescription('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div>
      <TopBar />
      <div className="pet-form-container">
        <form className="pet-form" onSubmit={handleSubmit}>
          <div className="form-left">
            <div className="photo-upload" onClick={handlePhotoClick}>
              {photoPreview ? (
                <img src={photoPreview} alt="Preview" className="photo-preview" />
              ) : (
                <>
                  <span>+</span>
                  <p>반려동물 사진 추가</p>
                </>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
                ref={fileInputRef}
                className="file-input"
              />
            </div>
          </div>

          <div className="form-right">
            <div className="input-group">
              <label>견/묘 선택</label>
              <div className="button-group">
                <button
                  type="button"
                  className={selectedType === 'dog' ? 'selected' : ''}
                  onClick={() => handleTypeClick('dog')}
                >
                  강아지
                </button>
                <button
                  type="button"
                  className={selectedType === 'cat' ? 'selected' : ''}
                  onClick={() => handleTypeClick('cat')}
                >
                  고양이
                </button>
              </div>
            </div>

            <div className="input-group">
              <label>이름</label>
              <input
                type="text"
                placeholder="반려동물의 이름을 입력해주세요"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>생년월일</label>
              <input
                type="text"
                placeholder="반려동물의 생년월일을 입력해주세요 ex)2000-01-01"
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </div>

            <div className="input-group">
              <label>품종</label>
              <input
                type="text"
                placeholder="반려동물의 품종을 입력해주세요"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                />
            </div>

            <div className="input-row">
              <div className="input-group">
                <label>지역</label>
                <select
                  value={region}
                  onChange={(e) => setRegion(e.target.value)}
                >
                  <option value="" disabled hidden>지역</option>
                  <option>서울</option>
                  <option>인천</option>
                  <option>대전</option>
                  <option>대구</option>
                  <option>부산</option>
                  <option>경기</option>
                  <option>광주</option>
                  <option>울산</option>
                  <option>제주</option>
                </select>
              </div>

              <div className="input-group">
                <label>성별</label>
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                >
                  <option value="" disabled hidden>성별</option>
                  <option>남자</option>
                  <option>여자</option>
                </select>
              </div>

              <div className="input-group neuter-group">
                <label>중성화 여부</label>
                <select
                  value={neuter}
                  onChange={(e) => setNeuter(e.target.value)}
                >
                  <option value="" disabled hidden>중성화 여부</option>
                  <option>중성화 O</option>
                  <option>중성화 X</option>
                </select>
              </div>
            </div>

            <div className="input-group">
              <label>상세 설명</label>
              <textarea
                placeholder="상세설명을 입력해주세요"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <button type="submit" className="submit-button">
              등록하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PetForm;