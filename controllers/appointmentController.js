const Appointment = require('../models/Appointment');
const Service = require('../models/Service');

// Crear nueva cita
exports.createAppointment = async (req, res) => {
  try {
    const { date, time, serviceId } = req.body;

    const newAppointment = await Appointment.create({
      date,
      time,
      serviceId,
      userId: req.user.userId,
    });

    res.status(201).json(newAppointment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al crear la cita', error: error.message });
  }
};

// Obtener citas del usuario logueado
exports.getUserAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.findAll({
      where: { userId: req.user.userId },
      include: [Service],
    });

    res.json(appointments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al obtener citas', error: error.message });
  }
};

// Eliminar una cita
exports.deleteAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    await appointment.destroy();
    res.json({ message: 'Cita eliminada correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al eliminar la cita', error: error.message });
  }
};

// Actualizar una cita
exports.updateAppointment = async (req, res) => {
  try {
    const appointmentId = req.params.id;
    const { date, time, status } = req.body;

    const appointment = await Appointment.findByPk(appointmentId);

    if (!appointment) {
      return res.status(404).json({ message: 'Cita no encontrada' });
    }

    appointment.date = date || appointment.date;
    appointment.time = time || appointment.time;
    appointment.status = status || appointment.status;

    await appointment.save();

    res.json({ message: 'Cita actualizada correctamente', appointment });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error al actualizar la cita', error: error.message });
  }
};
