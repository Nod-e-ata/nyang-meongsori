import React, {useState, useEffect} from 'react';
import './MyPage.css';
import TopBar from '../components/TopBar';
import userIcon from '../assets/user-icon.svg';


const MyPage = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [dogs, setDogs] = useState([]);
    const [cats, setCats] = useState([]);

    useEffect(() => {
        // fetch('/api/user/profile')
        // .then(res => res.join())
        // .then(data => {
        //     setUserInfo(data.user);
        //     setDogs(data.dogs);
        //     setCats(data.cats);
        // })
        // .catch(err => {
        //     console.error('마이페이지 정보 가져오기 실패:', err);
        // });

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
              imageUrl: 'https://mblogthumb-phinf.pstatic.net/MjAxOTA0MjNfMjA0/MDAxNTU2MDI1OTQ0MDQ1.RUW9HgVzkEXMHEf-ZVzdaZuLeo0U3l2bVOKQJ3fyiJsg.CAQrNBo3l6ibNmr9AMdMtKiUHQcjggr_XW6vHxVT2rcg.JPEG.rainlll/D5FE9DB0-77B6-49E6-8AED-747DC192F162-7018-0000030C881DA5EB_file.jpg?type=w800'
            },
            {
              name: '강아지2',
              breed: '말티즈',
              gender: '남',
              birthDate: '2025년 05월 21일',
              imageUrl: 'https://d2u3dcdbebyaiu.cloudfront.net/uploads/atch_img/712/9c3a70f127bfae65e8e81bd9d795bf2f_res.jpeg'
            },
            {
              name: '강아지3',
              breed: '푸들',
              gender: '여',
              birthDate: '2025년 06월 4일',
              imageUrl: 'https://image.dongascience.com/Photo/2017/07/14994185580021.jpg',
            },
          ],
          cats: [
            {
              name: '박씨',
              breed: '브리티시쇼트헤어',
              gender: '남',
              birthDate: '2023년 05월 30일',
              imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzeLMGyOuR8pspkgnG2MCwHKSgdcYZZsad2g&s',
            },
          ],
        };

        setUserInfo(mockData.user);
        setDogs(mockData.dogs);
        setCats(mockData.cats);
    }, []);

    if (!userInfo) return  <div>로딩 중...</div>;

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
                <div key={index} className="pet-card">
                  <img src={dog.imageUrl} alt={dog.name} />
                  <div>{dog.name}</div>
                  <div>{dog.breed} / {dog.gender}</div>
                  <div>{dog.birthDate}</div>
                </div>
              ))}
            </div>
          </section>
    
          <section>
            <h2>나의 반려묘</h2>
            <div className="pet-list">
              {cats.map((cat, index) => (
                <div key={index} className="pet-card">
                  <img src={cat.imageUrl} alt={cat.name} />
                  <div>{cat.name}</div>
                  <div>{cat.breed} / {cat.gender}</div>
                  <div>{cat.birthDate}</div>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
      ); 
    };
    
    export default MyPage;
