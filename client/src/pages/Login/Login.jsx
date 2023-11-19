import React, { useState, useEffect, useRef, useContext } from "react";
import { NavLink, useNavigate } from 'react-router-dom'
import './loginStyle.css'
import { AuthContext } from "../../context/authContext";
// import axios from "axios";


export default function Login() {
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient'); 
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const usernameRef = useRef(null);
  
  useEffect(() => {
    usernameRef.current.focus();
  }, []);

  const { login } = useContext(AuthContext)
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login({username,password,role})
      navigate("/home")
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <div className="login-container">
        <div className="box">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <div>
                    <i ></i>
                    <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} ref={usernameRef}/>
                </div>
                <label>Password</label>
                <div>
                    <i ></i>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div><br />
                <label>
            <input
              type="radio"
              value="doctor"
              checked={role === 'doctor'}
              onChange={(e) => setRole(e.target.value)}
            />
            Doctor
          </label>
          <label>
            <input
              type="radio"
              value="patient"
              checked={role === 'patient'}
              onChange={(e) => setRole(e.target.value)}
            />
            Patient
          </label>
          <label>
            <input
              type="radio"
              value="admin"
              checked={role === 'admin'}
              onChange={(e) => setRole(e.target.value)}
            />
            Admin
          </label>
                <input type="submit" value="Login" />
                {error && <p className="err">{error}</p>}
            </form>
            <NavLink className="sign-up" to={role==="patient" || role==="admin" ? "/register":"/NotPatient"}>Sign up</NavLink>
        </div>
    </div>
  );
}
