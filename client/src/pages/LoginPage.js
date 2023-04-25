import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/dataSlice';
import { useNavigate } from 'react-router-dom';

const LoginPage = () => {
  const nameRef = useRef();
  const passwordRef = useRef();
  const dispatch = useDispatch();
  const [errors, setErrors] = useState([]);
  const [isSuccess, setIsSuccess] = useState(null);
  const navigate = useNavigate();

  function auth() {
    const username = nameRef.current.value.trim();
    const password = passwordRef.current.value.trim();
    const validationErrors = [];
  
    if (password.length < 4 || password.length > 20) {
      validationErrors.push('Password must be between 4 and 20 characters');
    }
  
    if (!/[A-Z]/.test(password)) {
      validationErrors.push(
        'Password must contain at least one uppercase letter'
      );
    }
  
    if (!/[!@#$%^&*_+]/.test(password)) {
      validationErrors.push(
        'Password must contain at least one special symbol (!@#$%^&*_+)'
      );
    }
    
    setErrors(validationErrors);
  
    if (validationErrors.length === 0) {
      const user = {
        username: username,
        password: password,
      };
  
      const options = {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify(user),
      };
  
      fetch('http://localhost:3007/login', options)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setIsSuccess(true);
            dispatch(
              setUser({
                secret: data.secret,
                username: data.username,
              })
            );
            navigate('/profile');
          } else {
            setIsSuccess(false);
          }
        });
    }
  }

  return (
    <div className="page-layout">
      <input type="text" ref={nameRef} placeholder="username" />
      <input type="password" ref={passwordRef} placeholder="password" />

      <button onClick={auth}>Login</button>
      {isSuccess === true && <p className="success-color">Success</p>}
      {isSuccess === false && <p className="error-color">Wrong credentials</p>}
      {errors.length > 0 && (
        <div className="error-color">
          {errors.map((error, index) => (<p key={index}>{error}</p>))}
        </div>
      )}
    </div>
  );
};

export default LoginPage;
