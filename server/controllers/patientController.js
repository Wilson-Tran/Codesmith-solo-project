const { findOneAndDelete, findByIdAndDelete } = require('../models/patientModel');
const Patients = require('../models/patientModel');

const patientController = {};

patientController.getAllPatients = (req, res, next) => {
  Patients.find({}, (err, patientData) => {
    if (err) {
      return next(
        'Error in patientController.getAllPatients: ' + JSON.stringify(err)
      );
    } else {
      res.locals.patientData = patientData;
      console.log(patientData);
      return next();
    }  
  });
};

patientController.getOnePatient = (req, res, next) => {
  Patients.findOne({ _id: req.params.id }, (err, patientData) => {
    if (err) {
      return next(
        'Error in patientController.getOnePatient: ' + JSON.stringify(err)
      );
    } else {
      res.locals.patientData = patientData;
      return next();
    }
  });
};

patientController.createPatient = (req, res, next) => {
  const { firstName, lastName, dob, doctor, contact } = req.body;
  Patients.create({ firstName, lastName, dob, doctor, contact })  
    .then((data) => { 
      console.log(data);
      return next();
    });
};

patientController.updatePatient = (req, res, next) => {

};

patientController.deletePatient = (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  // Patients.findByIdAndDelete(id, (err, patientData) => {
  //   if (err) {
  //     return next(
  //       'Error in patientController.deletePatient: ' + JSON.stringify(err)
  //     );
  //   } else {
  //     res.locals.success = {message: 'Patient info successfully deleted'};
  //     return next();
  //   } 
  // });
  
  Patients.findByIdAndDelete(id)
    .then(() => {
      return next();
    });
};

module.exports = patientController; 