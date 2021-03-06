const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const patientSchema = new Schema({
  firstName: {type: String, required: true},
  lastName: {type: String, required: true}, 
  // contact: {  
  //   address: {type: String},
  //   city: {type: String}, 
  //   state: {type: String},
  //   zip: {type: String},
  //   phone: {type: String},
  //   altContactName: {type: String},
  //   altContactPhone: {type: String}
  // }
  doctor: {type: String}

});

module.exports = mongoose.model('Patient', patientSchema);
