import React from 'react';
import { Tasks } from './Components/Tasks';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Auth from './Components/Auth';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
        <Route path="/" element={<Auth />} />
      </Routes>
    </Router>
  );
}