const router = require('express').Router();
const { getFeedbacks, setFeedback, deleteFeedback, updateFeedback } = require('../controllers/feedbackPatient');
const { verifyToken } = require('../middleware/verifyToken');


router.get('/:doctorId', getFeedbacks);

router.post('/',verifyToken, setFeedback)

router.delete('/:feedbackId',verifyToken, deleteFeedback)

router.put('/:feedbackId',verifyToken, updateFeedback)


module.exports = router;