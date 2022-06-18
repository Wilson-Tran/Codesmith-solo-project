import { Router } from 'express';
import React, { ReactDOM, Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Switch is now Routes in new version of react-router-dom?
import CreatePatient from './components/CreatePatient';


import Login from './components/Login';

const App = props => {
  return (
    <div className='router'>
      <main>
        <Routes>
          <Route 
            path="/login"
            element={Login}
            />
          <Route 
            path="/api/create"
            element={<CreatePatient />}
          />
        </Routes>
      </main>
    </div>
  )
}

export default App;