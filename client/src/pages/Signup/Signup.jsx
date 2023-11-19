import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './signupStyle.css';

export default function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [error, setError] = useState(null);
  const [role, setRole] = useState('patient'); 

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/auth/register', {username,password,email,phone,role})
    .then(res => navigate("/login") )
    .catch(err => setError(err.response.data))
  };

  return (
<div className="container">
        <div className="box">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <label>Username</label>
                <div>
                    <i ></i>
                    <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                </div>
                <label>Password</label>
                <div>
                    <i ></i>
                    <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                </div><br />
                <label>Email</label>
                <div>
                    <i ></i>
                    <input type="email" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                </div><br />
                <label>Phone</label>
                <div>
                    <i ></i>
                    <input type="phone" placeholder="Enter Phone" value={phone} onChange={(e) => setPhone(e.target.value)}/>
                </div>
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
                <input type="submit" value="Sign Up" />
                {error && <p className='err'>{error}</p>}
            </form>
            <p className="sign-up">Already have an account ? <Link to="/login">Log In</Link></p>
        </div>
    </div>




    // <div>
    //   <h2>Inscription</h2>
    //   <form onSubmit={handleSubmit}>
    //     <input
    //       type="text"
    //       placeholder="Username"
    //       value={username}
    //       onChange={(e) => setUsername(e.target.value)}
    //     />
    //     <input
    //       type="password"
    //       placeholder="Password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //     <input
    //       type="email"
    //       placeholder="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //     <button type="submit">S'inscrire</button>
    //   </form>
    //   <p>
    //     Déjà un compte ? <Link to="/login">Se connecter</Link>
    //   </p>
    // </div>
  );
}
