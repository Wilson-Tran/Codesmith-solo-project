import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

const useInput = init => {
  const [ value, setValue ] = useState(init);
  const onChange = e => {
    setValue(e.target.value);
  };
  // return the value with the onChange function instead of setValue function
  return [ value, onChange ];
};

const UpdatePatient = (props) => {
  const [ firstName, firstNameOnChange ] = useInput('');
  const [ lastName, lastNameOnChange ] = useInput('');
  const [ dob, dobOnChange ] = useInput('');
  const [ doctor, doctorOnChange ] = useInput('');
  const [ address, addressOnChange ] = useInput('');
  const [ city, cityOnChange ] = useInput('');
  const [ state, stateOnChange ] = useInput('');
  const [ zip, zipOnChange ] = useInput('');
  const [ phone, phoneOnChange ] = useInput('');
  const [ nameError, setNameError ] = useState(null);
  
  const { id } = useParams();

  const navigate = useNavigate();
  
  const updateInfo = () => {
    if (firstName === '' || lastName === '') {
      setNameError('required');
    } else {
      const body = {  
        id, 
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
      fetch('/api/patients/' + {id}, {
        method: 'PATCH', 
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
        .catch(err => console.log('UpdatePatient fetch /patients: ERROR: ', err));
    }
  };

  return (
    <section className="mainSection createCharContainer">
      <header className="pageHeader">
        <h2> Edit Existing Patient Info</h2>
        <Link to="/patients" className="backLink">
          <Button variant='contained' type="button" className="btnSecondary">
              Back to all patients
          </Button>
        </Link>
      </header>
      <article className="card createPatient">
        <h3>Edit patient details</h3>
        <div className="createPatientFields">
          <label htmlFor="firstName">First Name: </label>
          <input name="firstName" placeholder={firstName} value={firstName} onChange={firstNameOnChange} />
          {nameError ? (<span className="errorMsg">{nameError}</span>) : null}
        </div>
        <div className="createPatientFields">
          <label htmlFor="lastName">Last Name: </label>
          <input name="lastName" placeholder={lastName} value={lastName} onChange={lastNameOnChange} />
          {nameError ? (<span className="errorMsg">{nameError}</span>) : null}
        </div>
        <div className="createPatientFields">
          <label htmlFor="dob">Date of Birth: </label>
          <input type="date" name="dob" min="1930-01-01" max="2019-12-31" placeholder={dob} value={dob} onChange={dobOnChange} />
        </div>
        <div className="createPatientFields">
          <label htmlFor="doctor">Physician: </label>
          <select name="doctor" value={doctor} onChange={doctorOnChange} placeholder={doctor}>
            <option value="">--Select Physician--</option>
            <option value="Dr. Zhao">Dr. Zhao</option>
            <option value="Dr. Tran">Dr. Tran</option>
          </select> 
        </div>
        <div className="createPatientFields">
          <label htmlFor="phone">Phone Number: </label>
          <input name="phone" value={phone} onChange={phoneOnChange} placeholder={phone}/>
        </div>
        <div className="createPatientFields">
          <label htmlFor="address">Street Address: </label>
          <input name="address" value={address} onChange={addressOnChange} placeholder={address}/>
        </div>
        <div className="createPatientFields">
          <label htmlFor="city">City: </label>
          <input name="city" value={city} onChange={cityOnChange} placeholder={city}/>
        </div>
        <div className="createPatientFields">
          <label htmlFor="state">State: </label>
          <input name="city" value={state} onChange={stateOnChange} placeholder={state}/>
        </div>
        <div className="createPatientFields">
          <label htmlFor="zipCode">Zip Code: </label>
          <input name="zipCode" value={zip} onChange={zipOnChange} placeholder={zip}/>
        </div>
        <div className="createPatientButtonContainer">
          <Link to="/patients" className="backLink">
            <Button variant='contained' type="button" className="btnSecondary">
              Cancel
            </Button>
          </Link>
          <Button variant='contained' className="btnMain" onClick={updateInfo}>Save</Button>
        </div>
      </article>
    </section>
  );  
};


export default UpdatePatient;