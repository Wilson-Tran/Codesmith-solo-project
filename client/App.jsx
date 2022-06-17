import { Router } from 'express';
import React, { Component } from 'react';
import { render } from 'react-dom';
import { Routes, Route } from 'react-router-dom';

import Login from './components/Login';

const App = props => {
  return (
    <div className='router'>
      <main>
        <Routes>
          <Route 
            exact 
            path="/"
            component={Login}
            />

        </Routes>
      </main>
    </div>
  )
}

export default App;