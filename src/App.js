import React from 'react';
import { BrowserRouter as Router,Route,Routes } from 'react-router-dom';
import TextEncryption from './components/TextEncryption'
export default function App() {
  return (
    <>
    <Router>
        <Routes>
            <Route exact path='/' element={<TextEncryption />} />
        </Routes>
    </Router>
    </>
  );
}