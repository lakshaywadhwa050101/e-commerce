import React, { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [error, setError] = useState("");
  const [redirect, setRedirect] = useState(false);
  const [redirectSignUp, setRedirectSignUp] = useState(false);

  useEffect(() => {
    const authToken = sessionStorage.getItem("authToken");
    if (authToken) {
      setRedirect(true);
    }
  }, []);

  const handleLogin = async () => {
    if (validateEmail(email) && validatePassword(password)) {
      try {
        const response = await axios.post("http://localhost:5000/login", {
          email,
          password,
        });
        console.log(response.data);
        window.alert("Logged in successfully!");
        setError("");

        sessionStorage.setItem("authToken",response.data.token)

        setRedirect(true);
      } catch (error) {
        if(error.response.data.error==='User not found'){
          window.alert('User Not Found, Kindly Sign Up!')
          setRedirectSignUp(true)
        }
        setError(error.response.data.error);
      }
    }
  };

  const validateEmail = (value) => {
    if (!value) {
      setEmailError("Email is required");
      return false;
    } else if (!value.includes("@") || !value.includes(".com")) {
      setEmailError("Invalid email format");
      return false;
    } else {
      setEmailError("");
      return true;
    }
  };

  const validatePassword = (value) => {
    const passwordRegex =
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!value) {
      setPasswordError("Password is required");
      return false;
    } else if (!passwordRegex.test(value)) {
      setPasswordError(
        "Password must be 8 characters long with at least one letter, one number, and one special character"
      );
      return false;
    } else {
      setPasswordError("");
      return true;
    }
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setEmail(value);
    validateEmail(value);
    setIsFormValid(validateEmail(value) && validatePassword(password));
  };

  const handlePasswordChange = (e) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    setIsFormValid(validateEmail(email) && validatePassword(value));
  };

  if (redirect) {
    return <Navigate to="/shop" />;
  }

  if (redirectSignUp) {
    return <Navigate to="/signup" />;
  }

  return (
    <div>
      <Navbar type="beforeLogin" />
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-lg">
              <div className="card-header bg-primary text-white text-center">
                <h3 className="mb-0">Login</h3>
              </div>
              <div className="card-body">
                {error && <div className="alert alert-danger">{error}</div>}
                <form>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="email"
                      className={`form-control ${
                        emailError ? "is-invalid" : ""
                      }`}
                      id="email"
                      placeholder="Enter email"
                      value={email}
                      onChange={handleEmailChange}
                    />
                    {emailError && (
                      <div className="invalid-feedback">{emailError}</div>
                    )}
                  </div>
                  <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input
                      type="password"
                      className={`form-control ${
                        passwordError ? "is-invalid" : ""
                      }`}
                      id="password"
                      placeholder="Password"
                      value={password}
                      onChange={handlePasswordChange}
                    />
                    {passwordError && (
                      <div className="invalid-feedback">{passwordError}</div>
                    )}
                  </div>
                  <button
                    type="button"
                    className="btn btn-primary btn-block"
                    onClick={handleLogin}
                    disabled={!isFormValid}
                  >
                    Get Started!
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

export default Login;
