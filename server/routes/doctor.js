const router = require('express').Router();
const { getDoctors, getDoctor, getDoctorss, deleteDoctor } = require('../controllers/doctor');


//GET ALL DOCTORS
router.get('/', getDoctors);

router.get('/:doctorId', getDoctor)

router.get('/info/:doctorId', getDoctorss)

router.delete('/:doctorId', deleteDoctor)

module.exports = router;