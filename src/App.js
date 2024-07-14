import React, { useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import SimpleDES from './components/SimpleDES';
import DES from './components/DES'
export default function App() {
  return (
    <>
    <Router>
        <Routes>
            <Route exact path='/' element={<DES />} />
        </Routes>
    </Router>
    </>
  );
}