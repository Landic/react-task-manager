import React, { useState } from 'react';
import { FaBriefcase, FaUser, FaShoppingCart, FaStar } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';
import './GlobalStyles.css';

const categories = [
    { id: 1, title: 'Work', description: 'Manage your professional tasks efficiently.', icon: <FaBriefcase /> },
    { id: 2, title: 'Personal', description: 'Keep track of your personal goals and tasks.', icon: <FaUser /> },
    { id: 3, title: 'Shopping', description: 'Organize your shopping lists and plans.', icon: <FaShoppingCart /> },
];

export function Tasks() {
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [selectedTask, setSelectedTask] = useState(null); 
    const [favorites, setFavorites] = useState({});
    const [tasks, setTasks] = useState({
        1: Array.from({ length: 10 }, (_, index) => `Task ${index + 1}`),
        2: Array.from({ length: 5 }, (_, index) => `Task ${index + 1}`),
        3: Array.from({ length: 8 }, (_, index) => `Task ${index + 1}`), 
    });
    const [modalOpen, setModalOpen] = useState(false);
    const [modalType, setModalType] = useState(null); 
    const [taskName, setTaskName] = useState('');
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
    const handleTaskClick = (taskId) => { setSelectedTask(taskId); };
    const handleAddTask = () => {
        setTaskName('');
        setModalType('add');
        setModalOpen(true);
        scrollToPanel();
    };
    const handleEditTask = () => {
        setTaskName(selectedTask);
        setModalType('edit');
        setModalOpen(true);
        scrollToPanel();
    };
    const handleDeleteTask = () => {
        if (window.confirm(`Are you sure you want to delete ${selectedTask}?`)) {
            setTasks((prev) => {
                const filteredTasks = prev[selectedCategory.id].filter(
                    (task) => task !== selectedTask
                );
                return { ...prev, [selectedCategory.id]: filteredTasks };
            });
            setSelectedTask(null);
        }
    };
    const handleSaveTask = () => {
        if (modalType === 'add') {
            setTasks((prev) => ({
                ...prev,
                [selectedCategory.id]: [...prev[selectedCategory.id], taskName],
            }));
        } else if (modalType === 'edit') {
            setTasks((prev) => {
                const updatedTasks = prev[selectedCategory.id].map((task) =>
                    task === selectedTask ? taskName : task
                );
                return { ...prev, [selectedCategory.id]: updatedTasks };
            });
            setSelectedTask(taskName);
        }
        setModalOpen(false);
    };
    const handleModalClose = () => { setModalOpen(false); };
    const scrollToPanel = () => { document.querySelector('.styled-modal')?.scrollIntoView({ behavior: 'smooth' }); };

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
                        onClick={handleAddTask}
                    >Add New Task</button>
                    <ul className="task-list">
                        {tasks[selectedCategory.id].map((task, index) => {
                            const taskId = `${selectedCategory.id}-${index}`;
                            const isFavorite = favorites[taskId];
                            return (
                                <li
                                    key={taskId}
                                    className="task-item d-flex justify-content-between align-items-center"
                                    onClick={() => handleTaskClick(task)}>
                                    {task}
                                    <FaStar
                                        className="ms-2"
                                        style={{
                                            cursor: 'pointer',
                                            color: isFavorite ? '#ff6b6b' : '#a4a4ea',
                                            fontSize: '1.5em',
                                        }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFavoriteToggle(taskId);
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
                    <h3 className="mb-3">CRUD Panel for Task "{selectedTask}"</h3>
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
                    <button className="btn btn-primary me-2" onClick={handleSaveTask}>Save Task </button>
                    <button className="btn close-btn btn-secondary" onClick={handleModalClose}>Close</button>
                </div>
            )}
        </div>
    );
}
