// import { Router } from 'express';
import React, { ReactDOM, Component } from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Switch is now Routes in new version of react-router-dom?

import CreatePatient from './components/CreatePatient';
import Login from './components/Login';
import Patients from './components/Patients';
import UpdatePatient from './components/UpdatePatient';

import './stylesheets/styles.css';

const App = props => {
  return (
    <div className="router">
      <main>
        <Routes>
          <Route path="/" element={<Login />}/>
          <Route path="/patients" element={<Patients />}/>
          <Route path="/create" element={<CreatePatient />}/>
          <Route path="/update/:id" element={<UpdatePatient />}/>
        </Routes>
      </main>
    </div>
  );
};

export default App;