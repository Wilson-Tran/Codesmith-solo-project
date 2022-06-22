const express = require('express');
const path = require('path');

const patientController = require('../controllers/patientController');
const userController = require('../controllers/userController');

const router = express.Router();

router.get('/', (req, res, next) => {
  res.status(200).sendFile(path.resolve(__dirname, '../../client/index.html'));
});

router.get('/patients', patientController.getAllPatients, (req, res) => {
  return res.status(200).json(res.locals.patientData);
});

router.post('/patients', patientController.createPatient, (req, res) => {
  res.status(201).redirect('/api/patients');
});

router.post('/users', userController.verifyUser, (req, res) => {
  return res.status(200).json(res.locals.id);
});

module.exports = router;