import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
function Signup() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [phoneError, setPhoneError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState('');
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const authToken = sessionStorage.getItem('authToken');
    if (authToken) {
      setRedirect(true);
    }
  }, []);
  if (redirect) {
    return <Navigate to="/shop" />;
  }

  const handleSignup = async () => {
    if (validateName(name) && validateEmail(email) && validatePhone(phone) && validatePassword(password)) {
      try {
        const response = await axios.post('http://localhost:5000/signup', { name, email, phone, password });
        console.log(response.data); 
        setError('');
        window.alert('Signup successful. Click OK to proceed to login.');
        setRedirect(true);
      } catch (error) {
        setError(error.response.data.error); 
      }
    }
  };

  const validateName = (value) => {
    if (!value) {
      setNameError('Name is required');
      return false;
    } else {
      setNameError('');
      return true;
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError('Email is required');
      return false;
    } else if (!value.includes('@') || !value.includes('.com')) {
      setEmailError('Invalid email format');
      return false;
    } else {
      setEmailError('');
      return true;
    }
  };

  const validatePhone = (value) => {
    if (!value) {
      setPhoneError('Phone number is required');
      return false;
    } else if (value.length !== 10) {
      setPhoneError('Phone number must be 10 digits');
      return false;
    } else {
      setPhoneError('');
      return true;
    }
  };

  const validatePassword = (value) => {
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!value) {
      setPasswordError('Password is required');
      return false;
    } else if (!passwordRegex.test(value)) {
      setPasswordError('Password must be 8 characters long with at least one letter, one number, and one special character');
      return false;
    } else {
      setPasswordError('');
      return true;
    }
  };


  const handleNameChange = (e) => {
    const value = e.target.value;
    setName(value);
    validateName(value);
    setIsFormValid(validateName(value) && validateEmail(email) && validatePhone(phone) && validatePassword(password));
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    setIsFormValid(validateName(name) && validateEmail(value) && validatePhone(phone) && validatePassword(password));
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value;
    setPhone(value);
    validatePhone(value);
    setIsFormValid(validateName(name) && validateEmail(email) && validatePhone(value) && validatePassword(password));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    setIsFormValid(validateName(name) && validateEmail(email) && validatePhone(phone) && validatePassword(value));
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }

  return (
    <div>
      <Navbar type='beforeLogin'/>
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white text-center">
              <h3 className="mb-0">Signup</h3>
            </div>
            <div className="card-body">
              {error && <div className="alert alert-danger">{error}</div>}
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    className={`form-control ${nameError ? 'is-invalid' : ''}`}
                    id="name"
                    placeholder="Enter name"
                    value={name}
                    onChange={handleNameChange}
                  />
                  {nameError && <div className="invalid-feedback">{nameError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`}
                    id="email"
                    placeholder="Enter email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                  {emailError && <div className="invalid-feedback">{emailError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="text"
                    className={`form-control ${phoneError ? 'is-invalid' : ''}`}
                    id="phone"
                    placeholder="Enter phone"
                    value={phone}
                    onChange={handlePhoneChange}
                  />
                  {phoneError && <div className="invalid-feedback">{phoneError}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`}
                    id="password"
                    placeholder="Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                  {passwordError && <div className="invalid-feedback">{passwordError}</div>}
                </div>
                <button
                  type="button"
                  className="btn btn-primary btn-block"
                  onClick={handleSignup}
                  disabled={!isFormValid}
                >
                  Signup
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  );
}

export default Signup;
