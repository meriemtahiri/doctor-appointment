const { getPatients } = require('../controllers/patient');

const router = require('express').Router();


router.get('/:patientId', getPatients)


module.exports = router;
