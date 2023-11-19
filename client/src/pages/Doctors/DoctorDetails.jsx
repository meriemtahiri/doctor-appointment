import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './doctorStyle.css'
import { AuthContext } from '../../context/authContext';
import axios from 'axios';

export default function DoctorDetails({id,name,speciality,email,phone,profile }) {

  const { currentUser } = useContext(AuthContext)
  const navigate = useNavigate();

  const handleFeedback = () => {
    navigate(`feedback/${id}`);
  };

  const handlBookAppointment = () => {
    if(JSON.parse(localStorage.getItem("user"))===null) navigate('/login')
    else navigate(`/patient/booking/${id}`)
  };

  const handleDelete = async() => {
    try {
      await axios.delete(`http://localhost:3001/doctors/${id}`)
    } catch (error) {
      
    }
  }
  const handleHoraire = async()=>{
    navigate("/info")
  }

let img = profile
  if(!img) img = 'https://institutcommotions.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-1.png'

  return (
	<div className="card_item">
		<div className="card_inner">
			<img src={img} alt='profil' />
			<div className="role_name">{name}</div>
			<div className="real_name">email:   {email}</div>
            <div className="real_name">phone:   {phone}</div>
			<div className="film">{speciality}</div>
          {currentUser?.role!=='admin' &&<button className="button-login" onClick={handlBookAppointment}><span className="text">Book Appointment</span></button>}
          {currentUser?.role!=='admin' &&<button className="button-login" onClick={handleFeedback}><span className="text">Feedback Patients</span></button>}
          {currentUser?.role==='admin' && <button className="button-login" onClick={handleDelete}><span className="text">Delete</span></button>}
          {currentUser?.role==='admin' && <button className="button-login" onClick={handleHoraire}><span className="text">Horaire</span></button>}

		</div>
    </div>
  )
}
