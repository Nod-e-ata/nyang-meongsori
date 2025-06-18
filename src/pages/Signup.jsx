import React, {useState} from 'react';
import './Signup.css';
import logo from '../assets/logo.svg';

const Signup = () => {
    const [id, setId] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [dogNum, setDogNum] = useState('');
    const [catNum, setCatNum] = useState('');


    const checkIdAvailability = async(id) => {
        const response = await fetch('/api/check-id?username=${id}');
        const data = await response.json();
        return data.isAvailable;  // 예: { isAvailable: true }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const idPattern = /^[a-zA-Z]+$/;
        const phonePattern = /^\d+$/;
        const numberPattern = /^\d*$/;
        const passwordPattern = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    
        if (!id) {
            alert("아이디를 입력해주세요.");
            return;
        }
    
        if (!idPattern.test(id)) {  
            alert("아이디는 영어만 입력할 수 있습니다.");
            return;
        }

        const isAvailable = await checkIdAvailability(id);
        if (!isAvailable) {
            alert("이미 사용 중인 아이디입니다.");
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
    
        if (!phonePattern.test(phone) || phone.length < 10) {
            alert("전화번호는 숫자만 입력하며 10자리 이상이어야 합니다.");
            return;
        }
    
        if (!numberPattern.test(dogNum)) {
            alert("반려견 수는 숫자만 입력할 수 있습니다.");
            return;
        }
    
        if (!numberPattern.test(catNum)) {
            alert("반려묘 수는 숫자만 입력할 수 있습니다.");
            return;
        }
    
        console.log("ID:", id);
        console.log("Password:", password);
        console.log("Phone:", phone);
        console.log("DogNum:", dogNum);
        console.log("CatNum:", catNum);
        alert("회원가입 성공!");
    };

    return (
        <div className="signup-container">
            <img src={logo} alt="로고" className="signup-logo"/>
            <form onSubmit={handleSubmit} className="signup-form">
                <input type="text" placeholder="아이디를 입력해주세요" value={id} onChange={(e) => setId(e.target.value)}/>
                <input type="password" placeholder="비밀번호를 입력해주세요" value={password} onChange={(e) => setPassword(e.target.value)} />
                <input type="password" placeholder="비밀번호를 재입력해주세요" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
                <input type="text" placeholder="전화번호를 입력해주세요 (숫자만 입력)" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                <input type="text" placeholder="반려견의 수를 입력해주세요 (숫자만 입력)" value={dogNum} onChange={(e) => setDogNum(e.target.value)}/>
                <input type="text" placeholder="반려묘의 수를 입력해주세요 (숫자만 입력)" value={catNum} onChange={(e) => setCatNum(e.target.value)}/>
                <button type="submit" className="signup-button">회원가입하기</button>
            </form>
            <div className="login-link">
                <a href="/login">로그인</a>
            </div>
        </div>
    );
};

export default Signup;
