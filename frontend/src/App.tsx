import React from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import ChatPage from './pages/ChatPage';
import Homepage from './pages/Homepage';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Homepage />} />
        <Route path='/chats' element={<ChatPage />} />
        <Route path='/login' element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default App;
