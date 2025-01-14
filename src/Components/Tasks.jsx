import React, { useState, useEffect } from 'react';
import { FaBriefcase, FaUser, FaShoppingCart, FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GlobalStyles.css';
import { TaskService } from './TaskService';

const categories = [
  { id: 1, title: 'Work', description: 'Manage your professional tasks efficiently.', icon: <FaBriefcase /> },
  { id: 2, title: 'Personal', description: 'Keep track of your personal goals and tasks.', icon: <FaUser /> },
  { id: 3, title: 'Shopping', description: 'Organize your shopping lists and plans.', icon: <FaShoppingCart /> },
];

export function Tasks() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [favorites, setFavorites] = useState({});
  const [tasks, setTasks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState(null);
  const [taskName, setTaskName] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const accountId = 1; // Replace with dynamic user ID
        const fetchedTasks = await TaskService.getAllTasks(accountId);
        setTasks(fetchedTasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedTask(null);
  };

  const handleFavoriteToggle = (taskId) => {
    setFavorites((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  const handleTaskClick = (task) => {
    setSelectedTask(task);
  };

  const handleAddTask = () => {
    setTaskName('');
    setModalType('add');
    setModalOpen(true);
    scrollToPanel();
  };

  const handleEditTask = () => {
    setTaskName(selectedTask.task.title);
    setModalType('edit');
    setModalOpen(true);
    scrollToPanel();
  };

  const handleDeleteTask = async () => {
    if (window.confirm(`Are you sure you want to delete ${selectedTask.task.title}?`)) {
      try {
        await TaskService.deleteTask(selectedTask.id);
        setTasks(tasks.filter(task => task.id !== selectedTask.id));
        setSelectedTask(null);
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    }
  };

  const handleSaveTask = async () => {
    if (!taskName.trim()) return;

    try {
      if (modalType === 'add') {
        const taskData = {
          task: {
            title: taskName,
            category: selectedCategory ? { id: selectedCategory.id } : null
          },
          account: {
            id: 1 // Replace with dynamic user ID
          }
        };
        const newTask = await TaskService.addTask(taskData);
        setTasks([...tasks, newTask]);
      } else if (modalType === 'edit' && selectedTask) {
        const updatedTask = await TaskService.editTask(selectedTask.id, taskName);
        setTasks(tasks.map(task => 
          task.id === selectedTask.id ? updatedTask : task
        ));
        setSelectedTask(updatedTask);
      }
      setModalOpen(false);
    } catch (error) {
      console.error('Error saving task:', error);
    }
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const scrollToPanel = () => {
    document.querySelector('.styled-modal')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-4xl font-bold mb-5">Task Categories</h1>
      <div className="row gy-4">
        {categories.map((category) => (
          <div className="col-md-4" key={category.id}>
            <div
              className="card task-card p-4 shadow-lg"
              onClick={() => handleCategoryClick(category)}
              style={{ cursor: 'pointer' }}>
              <div className="icon text-4xl mb-3">{category.icon}</div>
              <h2 className="text-2xl font-semibold mb-2" style={{ color: '#a4a4ea' }}>{category.title}</h2>
              <p style={{ color: '#cbcbf6' }}>{category.description}</p>
            </div>
          </div>
        ))}
      </div>

      {selectedCategory && (
        <div className="task-panel mt-4 p-3">
          <h3 className="mb-3">Tasks for {selectedCategory.title}</h3>
          <button className="mybut btn btn-primary mb-3"
            onClick={handleAddTask}>
            Add New Task
          </button>
          <ul className="task-list">
            {tasks.map((accountTask) => {
              const isFavorite = favorites[accountTask.id];
              return (
                <li
                  key={accountTask.id}
                  className="task-item d-flex justify-content-between align-items-center"
                  onClick={() => handleTaskClick(accountTask)}>
                  {accountTask.task.title}
                  <FaStar
                    className="ms-2"
                    style={{
                      cursor: 'pointer',
                      color: isFavorite ? '#ff6b6b' : '#a4a4ea',
                      fontSize: '1.5em',
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleFavoriteToggle(accountTask.id);
                    }}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {selectedTask && (
        <div className="crud-panel mt-4 p-3">
          <h3 className="mb-3">CRUD Panel for Task "{selectedTask.task.title}"</h3>
          <p>Here you can edit or delete the task.</p>
          <button className="btn btn-warning me-2" onClick={handleEditTask}>Edit Task</button>
          <button className="btn btn-danger me-2" onClick={handleDeleteTask}>Delete Task</button>
          <button className="btn close-btn btn-secondary"
            onClick={() => setSelectedTask(null)}>
            Close CRUD Panel
          </button>
        </div>
      )}

      {modalOpen && (
        <div className="crud-panel mt-4 p-3 styled-modal">
          <h4 className="mb-3">{modalType === 'add' ? 'Add New Task' : 'Edit Task'}</h4>
          <input
            type="text"
            className="form-control mb-3"
            style={{
              borderRadius: '8px',
              border: 'none',
              padding: '12px',
              fontSize: '18px',
              color: '#4a4a8a',
              backgroundColor: '#f9f9ff',
            }}
            placeholder="Enter task name"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <button className="btn btn-primary me-2" onClick={handleSaveTask}>Save Task</button>
          <button className="btn close-btn btn-secondary" onClick={handleModalClose}>Close</button>
        </div>
      )}
    </div>
  );
}