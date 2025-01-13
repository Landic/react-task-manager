import React from 'react';
import { Tasks } from './Components/Tasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Components/Auth';
import Main from './Components/Main';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<Auth />} />
        <Route path="/main" element={<Main />} />
      </Routes>
    </Router>
  );
};