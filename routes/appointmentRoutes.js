
const express = require('express');
const router = express.Router();
const { createAppointment, getUserAppointments } = require('../controllers/appointmentController');
const authMiddleware = require('../middleware/authMiddleware');

// Crear nueva cita (reservar)
router.post('/', authMiddleware, createAppointment);

// Obtener todas las citas del usuario logueado
router.get('/', authMiddleware, getUserAppointments);

module.exports = router;
