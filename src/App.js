import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Tasks } from './Components/Tasks';

export function App() {
  return (
    <Router>
      <Routes>
        <Route path="/tasks" element={<Tasks />} />
      </Routes>
    </Router>
  );
}