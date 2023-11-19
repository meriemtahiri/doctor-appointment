import React, { useState } from 'react';
import axios from 'axios';

export default function CreateDoctor() {
    const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [speciality, setSpeciality] = useState('');
  const [availability, setAvailability] = useState('');
  const [error, setError] = useState(null);
  const [message, setMessage] = useState(null);
  const role = 'doctor'

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios.post('http://localhost:3001/auth/register', {username,password,email,phone,speciality,availability,role})
    .then(res => setMessage("insert succesfully") )
    .catch(err => setError(err.response.data))
  };

  return (
    <div className="container">
        <div className="box">
          {message && <p>{message}</p>}
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
                <label>Speciality</label>
                <div>
                    <i ></i>
                    <input type="text" placeholder="Enter Speciality" value={speciality} onChange={(e) => setSpeciality(e.target.value)}/>
                </div>
                <label>Availability</label>
                <div>
                    <i ></i>
                    <input type="text" placeholder='["day: time",...]' value={availability} onChange={(e) => setAvailability(e.target.value)}/>
                </div>
                <input type="submit" value="Insert" />
                {error && <p className='err'>{error}</p>}
            </form>
        </div>
    </div>
  )
}
