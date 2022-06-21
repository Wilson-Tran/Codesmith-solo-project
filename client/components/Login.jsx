import React from 'react';
import Button from '@mui/material/Button';

const onSubmit = () => {
  
}

const Login = () => {
  return (
    <article className='card createPatient'>
      <div className="form">
        <form>
          <h1>Login</h1>
          <div className="input-container">
            <label>Username </label>
            <input type="text" name="uname" required />
          </div>
          <div className="input-container">
            <label>Password </label>
            <input type="password" name="pass" required />
          </div>
          <div className="button-container">
            <Button variant='contained' onClick={onSubmit}>Log In</Button>
          </div>
        </form>
      </div>
    </article>
  );
};

export default Login;