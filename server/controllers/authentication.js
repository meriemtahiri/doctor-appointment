const mysql = require('mysql')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const http = require('http');
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"doctorAppointment"
})


async function logout(req,res){
    res.send("log out succesfully")
}

async function register(req, res){ 
    try{
        if(req.body.role==='doctor'){
            const values = [req.body.username,req.body.password,req.body.email,req.body.phone,req.body.speciality,req.body.availability];
            let tableName = 'doctors';
       db.query(`SELECT * FROM ${tableName} WHERE username = ?`, [values[0]] ,
            async (err, data) => {
            if(err || values.some(val => val === "")) return res.status(401).json('registration failed !!')
            if(data.length>0) return res.status(409).json("username already exist !!")
            const salt = await bcrypt.genSalt(10)
            values[1] = await bcrypt.hash(req.body.password,salt)
            db.query(`INSERT INTO ${tableName} (username, password, email, phone, speciality, availability) VALUES (?, ?, ?, ?, ?, ?)`, values, (err,result) => {
                if (err) return res.status(401).json('Erreur de base de données !!');
                res.json("resistration succesfully (:")
            });
        })
        }
        else {
            const values = [req.body.username,req.body.password,req.body.email,req.body.phone,req.body.role];
            let tableName = values[4];
       db.query(`SELECT * FROM ${tableName} WHERE username = ?`, [values[0]] ,
            async (err, data) => {
            if(err || values.some(val => val === "")) return res.status(401).json('registration failed !!')
            if(data.length>0) return res.status(409).json("username already exist !!")
            const salt = await bcrypt.genSalt(10)
            values[1] = await bcrypt.hash(req.body.password,salt)
            db.query(`INSERT INTO ${tableName} (username, password, email, phone) VALUES (?, ?, ?, ?)`, values, (err,result) => {
                if (err) return res.status(401).json('Erreur de base de données !!');
                res.json("resistration succesfully (:")
            });
        })
        }
    }catch (err) {
        res.status(500).json('data base error');
    }
}

async function login(req, res){
    try {
        const { username, password, role } = req.body;
        let tableName = '';
        if (role === 'patient') tableName = 'patient';
        else if(role === "doctor") tableName = 'doctors';
        else tableName = 'admin'
        db.query(`SELECT * FROM ${tableName} WHERE username = ?`, [username], async(err, data) => {
            if (err || username === "") {
                return res.status(401).send('username incorrect or data base error');
            }
            if (data.length===0) {
                return res.status(401).send("username incorrect!");
            }
            if(tableName==='patient' || tableName==='admin'){
                if (!await bcrypt.compare(password,data[0].password)) {
                    return res.status(401).send('password incorrect');
                }
            }else{
                if(password!==data[0].password)
                return res.status(401).send('password incorrect');
            }
            let userId = ''
            if(tableName==='patient'){ userId = data[0].patientId }
            else{ userId = data[0].doctorId }
            const token = jwt.sign({ id:userId },"something", { expiresIn: "1d" });
            // const { password, ...other} = data[0]
            if(tableName==='patient'){
                res.send(
                    {
                    id: data[0].patientId,
                    username: data[0].username,
                    email: data[0].email,
                    phone: data[0].phone,
                    role: data[0].role,
                    token: token
                    }
                );
            }else if(tableName==='doctors') {
                res.send(
                    {
                    id: data[0].doctorId,
                    username: data[0].username,
                    email: data[0].email,
                    phone: data[0].phone,
                    speciality: data[0].speciality,
                    role: data[0].role,
                    token: token
                    }
                );
            } else {
                res.send(
                    {
                    id: data[0].adminId,
                    username: data[0].username,
                    email: data[0].email,
                    phone: data[0].phone,
                    role: data[0].role,
                    token: token
                    }
                );
            }
            });
    } catch (err) {
        res.status(500).send('data base error');
    }
}

module.exports = { register, login , logout }