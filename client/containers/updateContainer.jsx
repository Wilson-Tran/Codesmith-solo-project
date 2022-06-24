import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from '@mui/material/Button';

import UpdatePatient from '../components/UpdatePatient';
import FindPatient from '../components/FindPatient';

const updateContainer = () => {
  const { id } = useParams();
  
  return (
    <div className='updateContainer'>
      <Link to="/patients" className="backLink">
        <Button variant='contained'>Back to all patients</Button>
      </Link>
      <FindPatient patientID={id}/>
      <UpdatePatient patientID={id}/>
    </div>
  );
};

export default updateContainer;