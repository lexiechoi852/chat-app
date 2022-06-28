import React from 'react';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';
import UploadPage from './pages/UploadPage';
import SignUpPage from './pages/SignUpPage';
import { PrivateRoutes } from './utils/privateRoute';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route element={<PrivateRoutes/>}>
          <Route path='/' element={<Homepage />} />
          <Route path='/upload' element={<UploadPage />} />
        </Route>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
      </Routes>
    </div>
  );
}

export default App;
