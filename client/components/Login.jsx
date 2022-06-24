import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import { useNavigate } from 'react-router';

const Login = () => {
  const [errorMessages, setErrorMessages] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const renderErrorMessage = (name) => 
    name === errorMessages.name && (
      <div className='errorMsg'>{errorMessages.message}</div>
    );
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const { uname, pass } = document.forms[0];
    //console.log(uname.value, pass.value);
    const body = {
      username: uname.value, 
      password: pass.value
    };
    fetch('/api/users', {
      method: 'POST', 
      headers: {
        'Content-Type': 'Application/JSON'
      },
      body: JSON.stringify(body)
    }) 
      .then(res => {
        return res.json();
      })
      .then((user) => {
        console.log(user);
        if (user.unameError) setErrorMessages({name: 'uname', message: user.unameError}); 
        else if (user.passError) setErrorMessages({name: 'pass', message: user.passError}); 
        else setIsSubmitted(true);


      })
      .catch(err => console.log('Login.handleSubmit: get user: ERROR: ', err));
  };
  
  const navigate = useNavigate();

  const renderForm = (
    <article className='card login'>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <span className='title'>Sign In</span>
          <div className="input-container">
            <TextField name="uname" label="Username" margin="normal" fullWidth autofocus required/>
            {renderErrorMessage('uname')}
          </div>
          <div className="input-container">
            <TextField type="password" name="pass" label="Password" fullWidth required />
            {renderErrorMessage('pass')}
          </div>
          <div className="button-container">
            <Button type="submit" fullWidth variant='contained'>Sign In</Button>   
          </div>
        </form>
      </div>
    </article>
  );

  return (
    <div className='login-form'>
      {isSubmitted ? navigate('/patients') : renderForm}
      
    </div>
  );
};
export default Login;