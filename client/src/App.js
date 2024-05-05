import './App.css';

import { useTranslation } from 'react-i18next';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { useState } from 'react';


import Dashboard from './Dashboard';
import Login from './Login';
import Register from './Register';


function App() {
  const [user, setUser] = useState(null);

  console.log(user)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login setUser={setUser}/>} />
        <Route path="/register" element={<Register setUser={setUser}/>} />
        <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser} />} />


      </Routes>
    </BrowserRouter>
  );
}


export default App;
