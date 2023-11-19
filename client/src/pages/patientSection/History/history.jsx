import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function History() {
  const [history, setHistory] = useState([]);
  const { appointmentId } = useParams();

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/history/${appointmentId}`);
        setHistory(response.data);
      } catch (error) {
        // Gérer les erreurs ici
        console.error(error);
      }
    };

    getHistory(); // N'oubliez pas d'appeler la fonction getHistory ici
  }, [appointmentId]); // Ajoutez un tableau de dépendances vide pour déclencher l'effet une seule fois

  return (
    <>

    {history.length === 0 ? (
          <div className="no-appointments">there is no history yet</div>
        ) : (
          history.map((e, i) => {
            return (
              <div key={i}>
              <h2>Doctor Notes :</h2>
              <p>{e.doctorNotes}</p>
              <h2>Examan Result :</h2>
              <p>{e.examResult}</p>
              <hr />
          </div> 
            );
          })
        )}

    </>
  )
}
