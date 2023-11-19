import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import './feedbackStyle.css'

export default function Feedback() {
  const { doctorId } = useParams();
  const [feedbacksPatient, setFeedbacksPatient] = useState([]);
  const [error, setError] = useState(null);
  const [comment, setComment] = useState('');
  const navigate = useNavigate()

    const handleSubmit = async (e) => {
      e.preventDefault();
      let token
      let patient_id
      const user = JSON.parse(localStorage.getItem('user'))
      if(user){
        token = user.token
        patient_id = user.id
      }
      else navigate('/login')
      try {
        await axios.post('http://localhost:3001/feedback', {doctorId, patient_id, comment} , {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
      } catch (error) {
        setError(error.response.data)
      }
    };

  useEffect(() => {
    const fetchFeedbacks = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/feedback/${doctorId}`);
        if(response.data) setFeedbacksPatient(response.data);
      } catch (err) {
        setError(err.response.data)
      }
    };
    fetchFeedbacks();
  }, [doctorId]);


const img = 'https://institutcommotions.com/wp-content/uploads/2018/05/blank-profile-picture-973460_960_720-1.png'

  return (

<header>
      <div className="_container">
      <div className="container__left">
      <div className="login__container">
        <div className="top__content">
          <h1>Give your feedback</h1>
        </div>
        <div className="bottom__content">
          <form onSubmit={handleSubmit}>
            <div className="form__group">
              <span>
                <i className="ri-user-line"></i>
              </span>
              <textarea
              placeholder="Your Feedback"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              />
            </div>
            <button type="submit" className="button-login">Send</button>
            {error && <p className='err'>{error}</p>}
          </form>
        </div>
      </div>
      </div>
        <div className="container__right">
        {
        feedbacksPatient.map((feedback, index) => (
          <div key={index} className="card">
          <img src={img} alt="user" />
          <div className="card__content">
            <span><i className="ri-double-quotes-l"></i></span>
            <div className="card__details">
              <p>{feedback.comment}</p>
              <h4>- Marnus Stephen</h4>
            </div>
          </div>
        </div>
        ))
        }
        </div>
      </div>
    </header>
  )
}