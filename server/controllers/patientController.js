const Patients = require('../models/patientModel');

const patientController = {};

patientController.getAllUsers = (req, res, next) => {
  Patients.find({}, (err, patientData) => {
    if (err) {
      return next(
        'Error in patientController.getAllUsers: ' + JSON.stringify(err)
      );
    } else {
      console.log(patientData);
      res.locals.patients = patientData;
      return next();
    }
    
  });
};

module.exports = patientController; 