import React, { useState } from 'react';
import { LINK, useNavigate } from 'react-router-dom';

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
  const [ zipCode, zipCodeOnChange ] = useInput('');
  const [ phone, phoneOnChange ] = useInput('');
  
};


export default UpdatePatient;