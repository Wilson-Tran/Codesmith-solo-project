import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';

// Custom hook for handling input boxes
// saves us from creating onChange handlers for them individually
const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};

const CreatePatient = props => {
  const [ firstName, firstNameOnChange ] = useInput('');
  const [ lastName, lastNameOnChange ] = useInput('');
  const [ doctor, doctorOnChange ] = useInput('');
  const [ dob, dobOnChange ] = useInput('');
  const [ address, addressOnChange ] = useInput('');
  const [ city, cityOnChange ] = useInput('');
  const [ state, stateOnChange ] = useInput('');
  const [ zip, zipOnChange ] = useInput('');
  const [ phone, phoneOnChange ] = useInput('');
  const [ nameError, setNameError ] = useState(null);
  
  const navigate = useNavigate();
  const savePatient = () => {
    // check if name is empty
    if (firstName === '' || lastName === '') {
      setNameError('required');
    } else {
      const body = {
        firstName, 
        lastName,
        dob, 
        doctor, 
        contact: {
          address, 
          city, 
          state, 
          zip, 
          phone
        }
      };
      fetch('/api/patients', {
        method: 'POST', 
        headers: {
          'Content-Type': 'Application/JSON'
        }, 
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then((data) => {
          console.log(data);
          navigate('/patients');
        })
        .catch(err => console.log('CreatePatient fetch /patients: ERROR: ', err));
    }
  };

  useEffect(() => {
    setNameError(null);
  }, [firstName]);

  useEffect(() => {
    setNameError(null);
  }, [lastName]);

  return (
    <section className="mainSection createCharContainer">
      <header className="pageHeader">
        <h2> New Patient Registration</h2>
        <Link to="/patients" className="backLink">
          <Button variant='contained' type="button" className="btnSecondary">
              Back to all patients
          </Button>
        </Link>
      </header>
      <article className="card createPatient">
        <h3>Enter your patient details</h3>
        <div className="createPatientFields">
          <label htmlFor="firstName">First Name:</label>
          <input name="firstName" placeholder="John" value={firstName} onChange={firstNameOnChange} />
          {nameError ? (<span className="errorMsg">{nameError}</span>) : null}
        </div>
        <div className="createPatientFields">
          <label htmlFor="lastName">Last Name: </label>
          <input name="lastName" placeholder="Doe" value={lastName} onChange={lastNameOnChange} />
          {nameError ? (<span className="errorMsg">{nameError}</span>) : null}
        </div>
        <div className="createPatientFields">
          <label htmlFor="dob">Date of Birth: </label>
          <input type="date" name="dob" min="1930-01-01" max="2019-12-31" value={dob} onChange={dobOnChange} />
        </div>
        <div className="createPatientFields">
          <label htmlFor="doctor">Physician: </label>
          <select name="doctor" value={doctor} onChange={doctorOnChange}>
            <option value="">--Select Physician--</option>
            <option value="Dr. Zhao">Dr. Zhao</option>
            <option value="Dr. Tran">Dr. Tran</option>
          </select> 
        </div>
        <div className="createPatientFields">
          <label htmlFor="phone">Phone Number: </label>
          <input name="phone" value={phone} onChange={phoneOnChange} />
        </div>
        <div className="createPatientFields">
          <label htmlFor="address">Street Address: </label>
          <input name="address" value={address} onChange={addressOnChange} />
        </div>
        <div className="createPatientFields">
          <label htmlFor="city">City: </label>
          <input name="city" value={city} onChange={cityOnChange} />
        </div>
        <div className="createPatientFields">
          <label htmlFor="state">State: </label>
          <input name="city" value={state} onChange={stateOnChange} />
        </div>
        <div className="createPatientFields">
          <label htmlFor="zip">Zip Code: </label>
          <input name="zip" value={zip} onChange={zipOnChange} />
        </div>
        <div className="createPatientButtonContainer">
          <Link to="/patients" className="backLink">
            <Button variant='contained' type="button" className="btnSecondary">
              Cancel
            </Button>
          </Link>
          <Button variant='contained' className="btnMain" onClick={savePatient}>Save</Button>
        </div>
      </article>
    </section>
  );
};


export default CreatePatient;
