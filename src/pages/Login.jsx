import React, { useState } from 'react';
import './Login.css';
import logo from '../assets/logo.svg';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username) {
      alert('아이디를 입력해주세요.');
      return;
    }
    if (!password) {
      alert('비밀번호를 입력해주세요.');
      return;
    }

    const loginData = {
      username,
      password,
    };

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        if (result.data && result.data.token) {
            localStorage.setItem('token', result.data.token);
            console.log('로그인 성공! 토큰 저장됨:', result.data.token);
            window.location.href = '/';
        } else {
            console.error("로그인 성공 응답에 토큰 데이터가 없습니다.", result);
            alert("로그인은 성공했지만 토큰을 받지 못했습니다. 다시 시도해주세요.");
        }
      } else {
        alert(result.message || '로그인 실패');
      }
    } catch (error) {
      console.error('로그인 에러:', error);
      alert('서버 오류가 발생했습니다.');
    }
  };

  return (
    <div className="login-container">
      <img src={logo} alt="로고" className="login-logo" />
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          placeholder="아이디를 입력해주세요"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="login-button">
          로그인하기
        </button>
      </form>
      <div className="signup-link">
        <a href="/signup">회원가입</a>
      </div>
    </div>
  );
};

export default Login;