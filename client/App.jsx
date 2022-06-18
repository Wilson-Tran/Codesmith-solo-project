import { Router } from 'express';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Routes, Route } from 'react-router-dom'; // Switch is now Routes in new version of react-router-dom?
import CreatePatient from './components/CreatePatient';


import Login from './components/Login';

const App = props => {
  return (
    <div className='router'>
      <main>
        <Routes>
          <Route 
            exact 
            path="/login"
            component={Login}
            />
          <Route 
            exact
            path="/api/patients"
            component={CreatePatient}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App;