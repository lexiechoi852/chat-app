import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './temp/Homepage';
import LoginPage from './temp/LoginPage';
import UploadPage from './temp/UploadPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/upload' element={<UploadPage />} />
      </Routes>
    </div>
  );
}

export default App;
