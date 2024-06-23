import React, { useState } from 'react';
import axios from 'axios';
import './login.css';

export const AuthForm = () => {
  const [signUpMode, setSignUpMode] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [passwordMatch, setPasswordMatch] = useState(true);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (e.target.name === 'confirmPassword' || e.target.name === 'password') {
      setPasswordMatch(e.target.name === 'confirmPassword' ? e.target.value === formData.password : e.target.value === formData.confirmPassword);
    }
  };

  const handleSignUpClick = () => {
    setSignUpMode(true);
    setPasswordMatch(true);
  };

  const handleSignInClick = () => {
    setSignUpMode(false);
    setPasswordMatch(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (signUpMode && !passwordMatch) {
      return;
    }

    try {
      if (signUpMode) {
        await axios.post('http://localhost:4000/api/auth/register', formData);
        alert('User registered successfully');
        setSignUpMode(false);
      } else {
        const response = await axios.post('http://localhost:4000/api/auth/login', formData);
        alert('Login successful');
        // Store the token in localStorage or a state management library
        localStorage.setItem('token', response.data.token);
        window.location.href = 'homepage.html';
      }
    } catch (error) {
      alert('An error occurred');
      console.error('There was an error:', error);
    }

    setFormData({ username: '', email: '', password: '', confirmPassword: '' });
  };

  return (
    <div className={`container ${signUpMode ? 'sign-up-mode' : ''}`}>
      <div className="forms-container">
        <div className="signin-signup">
          {signUpMode ? (
            <form className="sign-up-form" onSubmit={handleSubmit}>
              <h2 className="title">Sign up</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-envelope"></i>
                <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} />
              </div>
              {!passwordMatch && <p style={{ color: 'red' }}>Passwords do not match!</p>}
              <input type="submit" className="btn" value="Sign up" />
              <p className="social-text">Or Sign up with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          ) : (
            <form className="sign-in-form" onSubmit={handleSubmit}>
              <h2 className="title">Sign in</h2>
              <div className="input-field">
                <i className="fas fa-user"></i>
                <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} />
              </div>
              <div className="input-field">
                <i className="fas fa-lock"></i>
                <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />
              </div>
              <input type="submit" value="Login" className="btn solid" />
              <p className="social-text">Or Sign in with social platforms</p>
              <div className="social-media">
                <a href="#" className="social-icon">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-twitter"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-google"></i>
                </a>
                <a href="#" className="social-icon">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          <div className="content">
            <h3>New here?</h3>
            <p>Your Journey Begins Here. Join us Today!</p>
            <button className="btn transparent" onClick={handleSignUpClick}>
              Sign up
            </button>
          </div>
          <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/955c6482aeeb2f0e77c1f3c66354da3bc4d7a72d/img/log.svg" className="image" alt="" />
        </div>
        <div className="panel right-panel">
          <div className="content">
            <h3>One of us?</h3>
            <p>Time to Reconnect. Sign in Below!</p>
            <button className="btn transparent" onClick={handleSignInClick}>
              Sign in
            </button>
          </div>
          <img src="https://raw.githubusercontent.com/sefyudem/Sliding-Sign-In-Sign-Up-Form/955c6482aeeb2f0e77c1f3c66354da3bc4d7a72d/img/log.svg" className="image" alt="" />
        </div>
      </div>
    </div>
  );
};
