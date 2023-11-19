import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {

  const [doctor, setDoctor] = useState([])
  const [appointment, setAppointment] = useState([])
  const navigate = useNavigate()


useEffect(() => {
  const getAppoitment = async () => {
    let token
      let patientId
      const user = JSON.parse(localStorage.getItem('user'))
      if(user){
        token = user.token
        patientId = user.id
      }
      else return navigate('/login')

    try {
      const appointmentINFO = await axios.get(`http://localhost:3001/appointment/${patientId}`,{
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setAppointment(appointmentINFO.data);

      const doctorIds = appointmentINFO.data.map((e) => e.doctorId);

      const doctorRequests = doctorIds.map((doctorId) =>
        axios.get(`http://localhost:3001/doctors/info/${doctorId}`)
      );

      const doctorResponses = await Promise.all(doctorRequests);

      const doctorData = doctorResponses.map((response) => response.data[0]);
      setDoctor(doctorData)

    } catch (error) {
      // Gérer les erreurs
    }
  };

  getAppoitment();
}, [navigate]);

  function handleDelate(id){
    try {
    axios.delete(`http://localhost:3001/appointment/${id}`)
    const updatedAppointments = appointment.filter((e) => e.appointmentId !== id);
      setAppointment(updatedAppointments);
    } catch (error) {
      
    }
  };

  const handleHistory = (id) => {
    navigate(`/history/${id}`)
  };

  const img = 'https://institutcommotions.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-1.png'

  return (
    <div className="wrapper">
      <div className="cards_wrap">
        {appointment.length === 0 ? (
          <div className="no-appointments">there is no appoitment yet</div>
        ) : (
          appointment.map((e, i) => {
            const currentDoctor = doctor[i];
            if (!currentDoctor) {
              return null;
            }
            return (
              <div className="card_item" key={i}>
                <div className="card_inner">
                  <img src={img} alt="profil" />
                  <div className="role_name">{currentDoctor.username}</div>
                  <div className="real_name">{currentDoctor.speciality}</div>
                  <div className="real_name">{e.Date_time}</div>
                  <div className="film">{e.status}</div>
                  <button
                    className="button-login"
                    onClick={() => handleDelate(e.appointmentId)}
                  >
                    <span className="text">Delete</span>
                  </button>
                  <button className="button-login" onClick={() => handleHistory(e.appointmentId)}>
                    <span className="text">Consultation History</span>
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
  
}
