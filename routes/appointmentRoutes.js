const express = require('express');
const router = express.Router();
const appointmentController = require('../controllers/appointmentController');
const authenticateToken = require('../middlewares/authMiddleware');

router.post('/', authenticateToken, appointmentController.createAppointment);
router.get('/my', authenticateToken, appointmentController.getUserAppointments);
router.delete('/:id', authenticateToken, appointmentController.deleteAppointment);
router.put('/:id', authenticateToken, appointmentController.updateAppointment);

module.exports = router;
