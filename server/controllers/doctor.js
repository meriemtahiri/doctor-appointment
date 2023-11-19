const mysql = require('mysql')
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"doctorAppointment"
})

async function getDoctors(req, res) {
    try {
        db.query('SELECT * FROM doctors', (err, data) => {
            if (err) {
                console.error(err);
                return res.status(500).json({ error: 'Erreur de base de données' });
            }
            if (data.length <= 0) {
                return res.json("Aucun médecin trouvé !");
            }
            return res.json(data);
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

async function getDoctor(req, res) {
    const doctorId = req.params.doctorId
    try {
        db.query('SELECT availability FROM doctors WHERE doctorId = ?',[doctorId], (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur de base de données' });
            }
            res.json(JSON.parse(data[0].availability));
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }
}

async function getDoctorss(req, res) {
    
    const doctorId = req.params.doctorId
    try {
        db.query('SELECT * FROM doctors WHERE doctorId = ?',[doctorId], (err, data) => {
            if (err) {
                return res.status(500).json({ error: 'Erreur de base de données' });
            }
            res.json(data);
        });
    } catch (error) {
        res.status(500).json({ error: 'Erreur serveur' });
    }

}

async function deleteDoctor(req, res) {
    const doctorId = req.params.doctorId;
    try {
        db.query('DELETE FROM doctors WHERE doctorId = ?', [doctorId], (err, result) => {
            if (err) {
                return res.status(500).json({ error: 'data base error' });
            }
            res.json("delete doctor");
        });
    } catch (error) {
        res.status(500).json({ error: 'server error' });
    }
}


module.exports = { getDoctors, getDoctor, getDoctorss, deleteDoctor }