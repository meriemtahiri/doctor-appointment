import React, { useEffect, useState } from 'react'
import './styleBooking.css'
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Booking() {
   const { doctorId } = useParams();
   const [availability, setAvailability] = useState([])
   const [error, setError] = useState(null);
   const [message, setMessage] = useState('');
   const [date_time, setDateTime] = useState('')
   const [peaple, setPeaple] = useState()
   const navigate = useNavigate()


  const handleSubmit = async (e) => {
    e.preventDefault();
    let token
      let patientId
      const user = JSON.parse(localStorage.getItem('user'))
      if(user){
        token = user.token
        patientId = user.id
      }
      else return navigate('/login')
    try {
      if(user){
        token = user.token
        patientId = user.id
      await axios.post(`http://localhost:3001/appointment/${doctorId}`, {doctorId, patientId , date_time , peaple}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessage('Appointment sent succesffuly')
    } else return navigate('/login')
    } catch (error) {
      setError(error.response.data)
    }
  };


   useEffect(() => {
      const fetchAvailability = async () => {
         try {
           const response = await axios.get(`http://localhost:3001/doctors/${doctorId}`);
           if(response.data) setAvailability(response.data);
         } catch (err) {
           setError(err.response.data)
         }
       };
       fetchAvailability();
   },[doctorId])

  return (
<div className="booking_form">
  {message && <p>{message}</p>}
    <div className="title">
     Booking Form
    </div>
    <div className="form">
       <div className="inputfield">
          <label>First Name</label>
          <input type="text" className="input" />
       </div>  
        <div className="inputfield">
          <label>Last Name</label>
          <input type="text" className="input" />
       </div>  
       <div className="inputfield">
          <label>available date and time</label>
          <div className="custom_select">
          <select
           name="availability" 
           id="availability" 
           required
           value={date_time}
              onChange={(e) => setDateTime(e.target.value)}
           >
          <option value="">Select</option>
        {availability.map( (date_time, index) => (
          <option value={date_time} key={index}>{date_time}</option>
        ))}
        </select>
          </div>
       </div> 
        <div className="inputfield">
          <label>How many peaple?</label>
          <div className="custom_select">
          <select 
          name="people" 
          id="people" 
          required
          value={peaple}
              onChange={(e) => setPeaple(e.target.value)}
          >
                    <option value="">People</option>
                    <option value="1">1 People</option>
                    <option value="2">2 People</option>
                    <option value="3">3 People</option>
                    <option value="4">4 People</option>
                </select>
          </div>
       </div> 
        <div className="inputfield">
          <label>Email Address</label>
          <input type="email" className="input" />
       </div> 
      <div className="inputfield">
          <label>Phone Number</label>
          <input type="text" className="input" />
       </div>  
      <div className="inputfield">
        <input type="submit" value="Book" className="btn" onClick={handleSubmit}/>
      </div>
      {error && <p className='err'>{error}</p>}
    </div>
</div>
)
}
