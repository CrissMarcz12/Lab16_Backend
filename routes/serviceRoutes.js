const express = require('express');
const router = express.Router();
const { createService, getAllServices } = require('../controllers/serviceController');
const authMiddleware = require('../middleware/authMiddleware');

// Solo usuarios autenticados pueden crear servicios
router.post('/', authMiddleware, createService);

// Listar todos los servicios (público o también puedes protegerlo si quieres)
router.get('/', getAllServices);

module.exports = router;

