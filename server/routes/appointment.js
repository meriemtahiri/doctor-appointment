const router = require('express').Router();
const { setAppointment, getAppointments, deleteAppointment, getAppointmentsD, putAppointment } = require('../controllers/appointment');
const { verifyToken } = require('../middleware/verifyToken');


router.post('/:doctorId',verifyToken, setAppointment) // id doctor in params

router.get('/:patientId',verifyToken, getAppointments)

router.get('/info/:doctorId', getAppointmentsD)

router.delete('/:appointmentId', deleteAppointment) // id appointment in params

router.put('/:appointmentId', putAppointment) // id appointment in params


module.exports = router;