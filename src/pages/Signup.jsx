import React, { useState } from 'react';
import './Signup.css';
import logo from '../assets/logo.svg';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const idPattern = /^[a-zA-Z0-9]+$/;
    const phonePattern = /^01(?:0|1|[6-9])(?:\d{3}|\d{4})\d{4}$/;
    const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    if (!username.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }
    if (!idPattern.test(username)) {
      alert("아이디는 영어와 숫자만 입력할 수 있습니다.");
      return;
    }
    if (username.length < 4 || username.length > 20) {
      alert("아이디는 4자 이상 20자 이하여야 합니다.");
      return;
    }

    if (!password) {
      alert("비밀번호를 입력해주세요.");
      return;
    }
    if (!passwordPattern.test(password)) {
      alert("비밀번호는 8자리 이상, 영어, 숫자, 특수문자를 모두 포함해야 합니다.");
      return;
    }
    if (password !== confirmPassword) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!phoneNumber.trim()) {
      alert("전화번호를 입력해주세요.");
      return;
    }
    if (!phonePattern.test(phoneNumber)) {
      alert("전화번호는 '01012345678' 형식의 10자리 또는 11자리 숫자여야 합니다.");
      return;
    }
    
    const signupData = {
      username,
      password,
      phoneNumber,
    };

    try {
      const response = await fetch('http://localhost:8080/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(signupData),
      });

      const result = await response.json();

      if (response.ok) {
        window.location.href = '/login';
      } else {
        alert(result.message || '회원가입 실패: 알 수 없는 오류가 발생했습니다.');
      }
    } catch (error) {
      console.error('회원가입 네트워크 에러:', error);
      alert('네트워크 오류가 발생했습니다. 다시 시도해주세요.');
    }
  };

  return (
    <div className="signup-container">
      <img src={logo} alt="로고" className="signup-logo" />
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          placeholder="아이디를 입력해주세요 (4-20자)"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          minLength="4"
          maxLength="20"
          required
        />
        <input
          type="password"
          placeholder="비밀번호를 입력해주세요 (8자리 이상, 영문/숫자/특수문자 포함)"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength="8"
          required
        />
        <input
          type="password"
          placeholder="비밀번호를 재입력해주세요"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <input
          type="tel"
          placeholder="전화번호를 입력해주세요 (예: 01012345678)"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          pattern="01[016-9]\d{3,4}\d{4}"
          title="전화번호는 '01012345678' 형식의 10자리 또는 11자리 숫자여야 합니다."
          required
        />
        <button type="submit" className="signup-button">
          회원가입하기
        </button>
      </form>
      <div className="login-link">
        <a href="/login">로그인</a>
      </div>
    </div>
  );
};

export default Signup;