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
  Math.random() < 0.5 ? dr = 'Dr. Tran' : dr = 'Dr. Zhao';
    
  seedPatients.push({
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    dob: faker.date.between('01/01/1945', '12/31/2005'),
    doctor: dr,
    contact: {
      address: faker.address.streetAddress(),
      city: faker.address.cityName(), 
      state: state,
      zip: faker.address.zipCodeByState(state),
      phone: faker.phone.phoneNumber(),
    }, 
    appointments: [
      {
        date: faker.date.between('01/01/2000', '06/24/2022'), 
        purpose: Math.random() < 0.5 ? 'Routine - Checkup' : 'Other'
      },
      {
        date: faker.date.between('01/01/2000', '06/24/2022'), 
        purpose: Math.random() < 0.5 ? 'Routine - Checkup' : 'Other'
      },
      {
        date: faker.date.between('01/01/2000', '06/24/2022'), 
        purpose: Math.random() < 0.5 ? 'Routine - Checkup' : 'Other'
      }
    ]
  });
}

const seedDB = async () => {
  await Patients.deleteMany({});
  await Patients.insertMany(seedPatients);
};

seedDB().then(() => {
  mongoose.connection.close();
  console.log('MONGO CONNECTION CLOSED');
});
