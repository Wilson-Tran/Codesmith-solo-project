const { faker } = require('@faker-js/faker');
const mongoose = require('mongoose');
const Patients = require('../models/patientModel');
const path = require('path');
require('dotenv').config({path: path.resolve(__dirname, '../../.env')});

faker.locale = 'en_US';

mongoose 
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true})
  .then(() => {
    console.log('MONGO CONNECTION OPEN!');
  })
  .catch((err) => {
    console.log(err);
  });
  
  const seedPatients = [];
  const state = 'CA';
  for (let i = 0; i < 5; i++) {
    let dr;
    Math.random() < 0.5 ? dr = 'Dr. Tran' : dr = 'Dr. Zhao'
    
    seedPatients.push({
      firstName: faker.name.firstName(),
      lastName: faker.name.lastName(),
      // contact: {
      //   address: faker.address.streetAddress(),
      //   city: faker.address.cityName(), 
      //   state: state,
      //   zip: faker.address.zipCodeByState(state),
      //   phone: faker.phone.phoneNumber(),
      //   altContactName: faker.name.findName(),
      //   altContactPhone: faker.phone.phoneNumber()
      // }
      doctor: dr
    })
  }

  const seedDB = async () => {
    await Patients.deleteMany({});
    await Patients.insertMany(seedPatients);
  };

  seedDB().then(() => {
    mongoose.connection.close();
    console.log('MONGO CONNECTION CLOSED');
  });
