import React, { useState, useEffect } from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

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
        doctor
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
          navigate('/');
        })
        .catch(err => console.log('CreatePatient fetch /patients: ERROR: ', err))
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
        <Link to="/" className="backLink">
          <button type="button" className="btnSecondary">
              Back to all patients
          </button>
        </Link>
      </header>
      <article className="card createPatient">
        <h3>Enter your patient details</h3>
        <div className="createPatientFields">
          <label htmlFor="firstName">First Name: </label>
          <input name="firstName" placeholder="John" value={firstName} onChange={firstNameOnChange} />
          {nameError ? (<span className="errorMsg">{nameError}</span>) : null}
        </div>
        <div className="createPatientFields">
          <label htmlFor="lastName">Last Name: </label>
          <input name="lastName" placeholder="Doe" value={lastName} onChange={lastNameOnChange} />
          {nameError ? (<span className="errorMsg">{nameError}</span>) : null}
        </div>
        <div className="createPatientFields">
          <label htmlFor="doctor">Doctor: </label>
          <input name="doctor" placeholder="Dr. Zhao" value={doctor} onChange={doctorOnChange} />
        </div>
       
        <div className="createPatientButtonContainer">
          <Link to="/" className="backLink">
            <button type="button" className="btnSecondary">
              Cancel
            </button>
          </Link>
          <button type="button" className="btnMain" onClick={savePatient}>Save</button>
        </div>
      </article>
    </section>
  );
};


export default CreatePatient;
