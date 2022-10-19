import React, { useState } from 'react';
import fire from '../fire.js';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [isError, setErrorMessage] = useState("");
    const navigate = useNavigate();

    
    const handleLogin = (e) => {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(email, password)
          .catch((error) => {
            setErrorMessage(error);
            console.error('Incorrect username or password');
        });
        navigate('/link');
    }

    const [isShown, setIsSHown] = useState(false);

    const togglePassword = () => {
      setIsSHown((isShown) => !isShown);
    };

    return (
        <div className="Auth-form-container">
          <form className="Auth-form" onSubmit={handleLogin}>
            <div className="Auth-form-content">
              <h3 className="Auth-form-title">Log In </h3>
              <p className="text-center mt-2">
                  <a href="/Register">Don't have an account?</a>
                  </p>
              <div className="form-group mt-3">
                <label>Email address</label>
                <input
                  type="email"
                  className="form-control mt-1"
                  onChange={({ target }) =>     
                  setEmail(target.value)}
                  placeholder="Enter email"
                />
              </div>
              <div className="form-group mt-3">
                <label>Password</label>
                <input
                  type={isShown ? "text" : "password"}
                  className="form-control mt-1"
                  onChange={({ target}) => 
                  setPassword(target.value)}
                  placeholder="Enter password"
                />

          <label htmlFor="checkbox">Show password?</label>
          <input
            id="checkbox"
            type="checkbox"
            checked={isShown}
            onChange={togglePassword}
          />
              </div>
              <div className="form-group mt-1">
              <div className="d-grid gap-2 mt-3">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <p class = "error red-text center align"> </p>
              </div>
              </div>
              <div class="forgot-password text-right mt-2">
                  <p className="text-center mt-2">
                  Forgot <a href="/forgotPassword">password?</a>
                  </p>
              </div>
            </div>
          </form>
        </div>
      )
};
export default Login;
