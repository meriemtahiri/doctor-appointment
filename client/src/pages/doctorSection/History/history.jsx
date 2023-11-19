/* eslint-disable no-restricted-globals */
import React, { useState } from "react"
import axios from 'axios'
import './styleHistory.css'
import { useParams } from "react-router-dom"

export default function HistoryD() {
  const { appointmentId } = useParams()
  const [histoy, setHistory] = useState({notes:'',result:''})
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);


async function handleSubmit(){
  try {
    await axios.post('http://localhost:3001/history', {...histoy,appointmentId})
    setMessage("sent succesffuly")
  } catch (error) {
    setError(error.response.data)
  }
}


  return (
<div className="booking_form">
  {message && <p>{message}</p>}
    <div className="title">
     
    </div>
    <div className="form"> 
    <label>Notes</label>
    <textarea
  value={histoy.notes}
  onChange={(e) => setHistory({notes:e.target.value,result:histoy.result})}
  placeholder="Notes..."
  className="ui-autocomplete-input"
  autoComplete="off"
  aria-autocomplete="list"
  aria-haspopup="true"
></textarea>

<label>Results</label>
<textarea
  value={histoy.result}
  onChange={(e) => setHistory({notes:histoy.notes,result:e.target.value})}
  placeholder="Results..."
  className="ui-autocomplete-input"
  autoComplete="off"
  aria-autocomplete="list"
  aria-haspopup="true"
></textarea>

      <div className="inputfield">
        <input type="submit" value="Send" className="btn" onClick={handleSubmit} />
      </div>
      {error && <p className='err'>{error}</p>}
    </div>
</div>
  )

}

