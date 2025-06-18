import React, {useState} from 'react';
import './Login.css';
import logo from '../assets/logo.svg';

const Login = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');

    const checkIdAvailability = async(id) => {
        const response = await fetch(`/api/check-id?usename=${id}`);
        const data = await response.json();
        return data.isAvailable;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('ID:', id);
        console.log('Password:', password);


        const isAvailable = await checkIdAvailability(id);
        if (!isAvailable) {
            alert("등록되지 않은 아이디입니다.");
            return;
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="로고" className="login-logo"/>
            <form onSubmit={handleSubmit} className="login-form">
                <input type="text" placeholder="아이디를 입력해주세요" value={id} onChange={(e) => setId(e.target.value)}/>
                <input type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button type="submit" className="login-button">로그인하기</button>
            </form>
            <div className="signup-link">
                <a href="/signup">회원가입</a>
            </div>
        </div>
    );
};

export default Login;