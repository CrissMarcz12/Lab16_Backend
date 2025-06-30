const Service = require('../models/Service');

// Crear un nuevo servicio
exports.createService = async (req, res) => {
  const { name, description, price } = req.body;

  try {
    const newService = await Service.create({ name, description, price });
    res.status(201).json({ message: 'Servicio creado correctamente', service: newService });
  } catch (error) {
    res.status(500).json({ message: 'Error al crear servicio', error: error.message });
  }
};

// Obtener todos los servicios
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.findAll();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener servicios', error: error.message });
  }
};

