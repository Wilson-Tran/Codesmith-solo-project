const Patients = require('../models/patientModel');

const patientController = {};

patientController.getAllPatients = (req, res, next) => {
  Patients.find({}, (err, patientData) => {
    if (err) {
      return next(
        'Error in patientController.getAllUsers: ' + JSON.stringify(err)
      );
    } else {
      res.locals.patientData = patientData;
      return next();
    }  
  });
};

patientController.createPatient = (req, res, next) => {
  const { firstName, lastName, doctor } = req.body;
  Patients.create({ firstName, lastName, doctor })  
    .then((data) => { 
      console.log(data);
      return next();
    });
};

module.exports = patientController; 