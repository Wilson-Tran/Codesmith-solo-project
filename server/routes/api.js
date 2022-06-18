const express = require('express');
const path = require('path')

const patientController = require('../controllers/patientController');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../client/index.html'));
});

router.get('/patients', patientController.getAllPatients, (req, res) => {
  res.status(200).json({patients: res.locals.patientData})
});

router.post('/create', patientController.createPatient, (req, res) => {
  res.status(201).redirect('/api/patients');
})


module.exports = router;