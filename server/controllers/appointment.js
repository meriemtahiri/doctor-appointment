const mysql = require('mysql')
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"doctorAppointment"
})

async function setAppointment(req,res){
    const newAppoitment = [req.body.doctorId, req.body.patientId, req.body.date_time, req.body.peaple]
    if(!newAppoitment[2]) return res.status(401).send("select date and time") 
    try {
        db.query('INSERT INTO appointment (doctorId, patientId, Date_time, peaple) VALUES (?, ?, ?, ?)',newAppoitment,
        (err,result)=>{
            if(err) return res.status(401).send('data base error');
            res.status(200).send("booking succefully")
        }
        )
    } catch (error) {
        res.status(401).send('data base error')
    }    
}

async function getAppointments(req,res){
    const patientId = req.params.patientId
    try {
        db.query('SELECT * FROM appointment WHERE patientId = ?',[patientId],
        (err,data)=>{
            if(err) return res.status(401).send('data base error');
            res.status(200).send(data)
        }
        )
    } catch (error) {
        res.status(401).send('data base error')
    }     
}

async function getAppointmentsD(req,res){
  const doctorId = req.params.doctorId
  try {
      db.query('SELECT * FROM appointment WHERE doctorId = ?',[doctorId],
      (err,data)=>{
          if(err) return res.status(401).send('data base error');
          res.status(200).send(data)
      }
      )
  } catch (error) {
      res.status(401).send('data base error')
  }     
}

async function deleteAppointment(req,res){
    const appointmentId = req.params.appointmentId;
    try {
      db.query('DELETE FROM appointment WHERE appointmentId = ?', [appointmentId], (err, result) => {
        if (err) {
          return res.status(500).send('Database error');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('appointment not found'); 
        }
        res.status(200).send('appointment deleted successfully');
      });
    } catch (error) {
      res.status(500).send('Server error');
    }    
}

// Définissez la fonction putAppointment
async function putAppointment(req, res) {
    const { appointmentId } = req.params;
    const { status } = req.body;
  
    // Assurez-vous que le statut est l'un des états autorisés (Pending, Confirmed, Cancelled)
    const allowedStatus = ["Pending", "Confirmed", "Cancelled"];
    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ error: "Statut invalide" });
    }
  
    try {
      // Mettez à jour l'état du rendez-vous dans la base de données
      const updateQuery = "UPDATE appointment SET status = ? WHERE appointmentId = ?";
      await db.query(updateQuery, [status, appointmentId]);
  
      // Répondez avec succès
      res.status(200).json({ message: "Statut mis à jour avec succès" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erreur serveur" });
    }
  }
    

module.exports={ setAppointment, getAppointments, getAppointmentsD, deleteAppointment, putAppointment }