const express = require('express')
const cors = require('cors')

const app = express()


app.use(cors())
app.use(express.json())

app.use("/auth",require('./routes/authentication'))
app.use("/doctors",require('./routes/doctor'))
app.use("/patient",require('./routes/patient'))
app.use("/feedback",require('./routes/feedbackPatient'))
app.use("/appointment",require('./routes/appointment'))
app.use("/history",require('./routes/consultationHistory'))
// app.use("/admin",require('./routes/admin'))


app.listen(3001 , () => { 
    console.log('Listening at port 3001"...') })
