const mysql = require('mysql')
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"doctorAppointment"
})

async function getPatients(req, res) {
    
    const patientId = req.params.patientId
    try {
        db.query('SELECT * FROM patient WHERE patientId = ?',[patientId], (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur de base de données' });
            }
            res.json(data);
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }

}

module.exports = { getPatients }