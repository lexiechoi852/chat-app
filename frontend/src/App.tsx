import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';

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
