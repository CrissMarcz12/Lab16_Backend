const Appointment = require('../models/Appointment');
const Service = require('../models/Service');
const User = require('../models/User');

// Crear una nueva cita
exports.createAppointment = async (req, res) => {
  const { serviceId, date, time } = req.body;
  const userId = req.user.userId;  // Obtenemos el ID del usuario desde el JWT

  try {
    // Verificar si el servicio existe
    const service = await Service.findByPk(serviceId);
    if (!service) {
      return res.status(404).json({ message: 'Servicio no encontrado' });
    }

    const newAppointment = await Appointment.create({
      userId,
      serviceId,
      date,
      time,
      status: 'pending',
    });

    res.status(201).json({ message: 'Cita reservada exitosamente', appointment: newAppointment });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear cita', error: error.message });
  }
};

// Obtener todas las citas del usuario logueado
exports.getUserAppointments = async (req, res) => {
  const userId = req.user.userId;

  try {
    const appointments = await Appointment.findAll({
      where: { userId },
      include: [
        { model: Service, attributes: ['name', 'price'] },
      ],
    });

    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener citas', error: error.message });
  }
};

