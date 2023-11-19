import React, { useEffect, useState } from 'react'

import './appointmentStyle.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Appointment() {

    const [patient, setPatient] = useState([])
    const [appointment, setAppointment] = useState([])
    const [error, setError] = useState(null);
    const navigate = useNavigate()


    useEffect(() => {
        const getAppoitment = async () => {
        const doctorId = JSON.parse(localStorage.getItem('user')).id;
        try {
            const appointmentINFO = await axios.get(`http://localhost:3001/appointment/info/${doctorId}`);
            setAppointment(appointmentINFO.data);
      
            const patientIds = appointmentINFO.data.map((e) => e.patientId);
      
            const patientRequests = patientIds.map((patientId) =>
              axios.get(`http://localhost:3001/patient/${patientId}`)
            );
      
            const patientResponses = await Promise.all(patientRequests);
      
            const patientData = patientResponses.map((response) => response.data[0]);
            setPatient(patientData)
      
          } catch (error) {
            // Gérer les erreurs
          }
        };
        getAppoitment();
      }, []);

function handleDelate(id){
  try {
    axios.delete(`http://localhost:3001/appointment/${id}`)
    const updatedAppointments = appointment.filter((e) => e.appointmentId !== id);
    setAppointment(updatedAppointments);
    } catch (error) {
          
        }
      };
function handleSend(id,s){
  try {
    if(s==='Pending' || s==='Cancelled') setError("the status should be Confirmed")
    else navigate(`/patient/historyD/${id}`)
  } catch (error) {
    
  }
}

function handleStatus(appointmentId) {
  try {
    const appointmentIndex = appointment.findIndex((e) => e.appointmentId === appointmentId);
    const currentStatus = appointment[appointmentIndex].status;
    const possibleStatus = ["Pending", "Confirmed", "Cancelled"];
    const currentIndex = possibleStatus.indexOf(currentStatus);
    const nextIndex = (currentIndex + 1) % possibleStatus.length;
    const newStatus = possibleStatus[nextIndex];
    axios.put(`http://localhost:3001/appointment/${appointmentId}`, { status: newStatus });
    const updatedAppointments = [...appointment];
    updatedAppointments[appointmentIndex].status = newStatus;
    setAppointment(updatedAppointments);
  } catch (error) {
    // Gérez les erreurs
  }
}


const img = 'https://institutcommotions.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-1.png'

return (
    <section className="table__body">
  <table>
  {error && <p className='err'>{error}</p>}
    <thead>
      <tr>
        <th><span className="icon-arrow"></span></th>
        <th>Patient <span className="icon-arrow"></span></th>
        <th>Mail <span className="icon-arrow"></span></th>
        <th>Phone <span className="icon-arrow"></span></th>
        <th>Date Time <span className="icon-arrow"></span></th>
        <th>Status <span className="icon-arrow"></span></th>
        <th>Action <span className="icon-arrow"></span></th>
        <th>History <span className="icon-arrow"></span></th>
      </tr>
    </thead>
    <tbody>
      {appointment.length === 0 ? (
        <tr>
          <td colSpan="7" className="no-appointments">
            There are no appointments yet.
          </td>
        </tr>
      ) : (
        appointment.map((e, i) => {
          const currentPatient = patient[i];
          if (!currentPatient) {
            return null;
          }
          return (
            <tr key={i}>
              <td><img src={img} alt="profile" /></td>
              <td>{currentPatient.username}</td>
              <td>{currentPatient.email}</td>
              <td>{currentPatient.phone}</td>
              <td>{e.Date_time}</td>
              <td><p className={e.status} onClick={() => handleStatus(e.appointmentId)}>{e.status}</p></td>
              <td><p className="delete" onClick={() => handleDelate(e.appointmentId)}>Delete</p></td>
              <td><p className="send" onClick={() => handleSend(e.appointmentId,e.status)}>Send</p></td>
            </tr>
          );
        })
      )}
    </tbody>
  </table>
</section>
)
}
