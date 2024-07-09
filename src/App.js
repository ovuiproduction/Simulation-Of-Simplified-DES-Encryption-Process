import React, { useState } from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import SimpleDES from './components/SimpleDES';

export default function App() {
  return (
    <>
    <Router>
        <Routes>
            <Route exact path='/' element={<SimpleDES />} />
        </Routes>
    </Router>
    </>
  );
}