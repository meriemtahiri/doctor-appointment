import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Doctor from './DoctorDetails';

const API_URL = "http://localhost:3001";

export default function Doctors() {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {

    axios.get(`${API_URL}/doctors`)
      .then(response => {
        setDoctors(response.data);
      })
      .catch(error => {
        console.error("Error fetching doctors:", error);
      });
  }, []);



  return (
    <div className="wrapper">
      <div className="cards_wrap">
        {
          doctors.map(doctor => (
            <Doctor
              key={doctor.doctorId}
              id={doctor.doctorId}
              name={doctor.username}
              speciality={doctor.speciality}
              email={doctor.email}
              phone={doctor.phone}
              profile={doctor.profile}
            />
          ))
        }
      </div>
    </div>
  );
}
