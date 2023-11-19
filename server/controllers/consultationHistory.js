const mysql = require('mysql')
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"doctorAppointment"
})

async function setHistory(req,res){
const body = req.body
if(body.notes==='' || body.result==='') return res.status(401).send("result and notes can't be empty")
db.query('INSERT INTO consultationhistory (appointmentId,date_time,doctorNotes,examResult) VALUES (?,?,?,?)',
[body.appointmentId,new Date(),body.notes,body.result],
(err,data)=>{
    if(err) return res.status(401).send(err)
    res.send(" added succesfully")
}
)
}

async function getHistory(req,res){
    const appointmentId = req.params.appointmentId
    try {
        db.query('SELECT * FROM consultationhistory WHERE appointmentId = ?', [appointmentId],(err,data)=>{
            if(err) return res.status(401).send("request error")
            res.send(data)
        })
    } catch (error) {
        res.status(401).send("data base error")
    }
}

async function deleteHistory(req,res){
    res.send("delete history")
}

module.exports = { setHistory, getHistory, deleteHistory }