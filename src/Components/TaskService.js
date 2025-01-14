
import axios from 'axios';

const API_URL = 'http://localhost:8080/api/tasks';

export const TaskService = {
  getAllTasks: async (accountId) => {
    try {
      const response = await axios.get(`${API_URL}/account/${accountId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching tasks:', error);
      throw error;
    }
  },

  addTask: async (taskData) => {
    try {
      const response = await axios.post(API_URL, taskData);
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
      throw error;
    }
  },

  editTask: async (taskId, taskData) => {
    try {
      const response = await axios.put(`${API_URL}/${taskId}/title`, taskData.title);
      return response.data;
    } catch (error) {
      console.error('Error editing task:', error);
      throw error;
    }
  },

  deleteTask: async (taskId) => {
    try {
      const response = await axios.delete(`${API_URL}/${taskId}`);
      return response.data;
    } catch (error) {
      console.error('Error deleting task:', error);
      throw error;
    }
  },
};