const router = require('express').Router();
const { getHistory, deleteHistory, setHistory } = require('../controllers/consultationHistory');

router.post('/', setHistory)

router.get('/:appointmentId', getHistory)

router.delete('/:patientId', deleteHistory)


module.exports = router;
