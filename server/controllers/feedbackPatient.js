const mysql = require('mysql')
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"doctorAppointment"
})



async function getFeedbacks(req, res){
    const doctorId = req.params.doctorId;
    try {
        db.query(`SELECT * FROM feedback WHERE doctorId = ?`, [doctorId], async(err, data) =>{
            if (err) {
                return res.status(401).send('data base error');
            }
            if (data.length===0) {
                return res.status(401).send("No feedback Found !");
            }  
            res.status(200).send(data) 
        })
    } catch (error) {
        res.status(401).send('data base error')
        }
  }

async function setFeedback(req,res){
    const newFeedback = [req.body.doctorId, req.body.patient_id, req.body.comment]
    if(newFeedback[2]==="") return res.status(401).send("provide a valid comment") 
    try {
        db.query('INSERT INTO feedback (doctorId, patientId, comment) VALUES (?, ?, ?)',newFeedback,
        (err,result)=>{
            if(err) return res.status(401).send('data base error');
            res.status(200).send("added succesfully")
        }
        )
    } catch (error) {
        res.status(401).send('data base error')
    }
}

async function deleteFeedback(req, res) {
    const feedbackId = req.params.feedbackId; 
    try {
      db.query('DELETE FROM feedback WHERE feedbackId = ?', [feedbackId], (err, result) => {
        if (err) {
          return res.status(500).send('Database error');
        }
        if (result.affectedRows === 0) {
          return res.status(404).send('Feedback not found'); 
        }
        res.status(200).send('Feedback deleted successfully');
      });
    } catch (error) {
      res.status(500).send('Server error');
    }
  }

async function updateFeedback(req, res) {
  const feedbackId = req.params.feedbackId;
  const updatedComment = req.body.comment;
    if (!updatedComment || updatedComment === "")  return res.status(400).send("provide a valid comment");
    try {
        db.query('UPDATE feedback SET comment = ? WHERE feedbackId = ?', [updatedComment, feedbackId], (err, result) => {
            if (err)  return res.status(500).send('Database error');
            if (result.affectedRows === 0)  return res.status(404).send('Feedback not found');
            res.status(200).send('Feedback updated successfully');
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error');
    }
}



  module.exports = { getFeedbacks, setFeedback, deleteFeedback, updateFeedback }