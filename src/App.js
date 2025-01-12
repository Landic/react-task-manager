import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { FaBriefcase, FaUser, FaShoppingCart } from 'react-icons/fa'; // Иконки

const categories = [
  { id: 1, title: 'Work', description: 'Manage your professional tasks efficiently.', icon: <FaBriefcase /> },
  { id: 2, title: 'Personal', description: 'Keep track of your personal goals and tasks.', icon: <FaUser /> },
  { id: 3, title: 'Shopping', description: 'Organize your shopping lists and plans.', icon: <FaShoppingCart /> },
];

export function App() {
  return (
    <div className="container py-5">
      <h1 className="text-center text-4xl font-bold mb-5">Task Categories</h1>
      <div className="row gy-4">
        {categories.map((category) => (
          <div className="col-md-4" key={category.id}>
            <div className="card task-card p-4 shadow-lg">
              <div className="icon text-4xl mb-3">{category.icon}</div>
              <h2 className="text-2xl font-semibold mb-2">{category.title}</h2>
              <p>{category.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}