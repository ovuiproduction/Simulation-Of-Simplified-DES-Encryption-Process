import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import Simple_DES from './components/Simple_DES'
export default function App() {
  return (
    <>
    <Router>
        <Routes>
            <Route exact path='/' element={<Simple_DES />} />
        </Routes>
    </Router>
    </>
  );
}