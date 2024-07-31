// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001', // Make sure this matches your backend port
});

export const getCategories = async () => {
  try {
    const response = await api.get('/categories');
    return response.data.data;
  } catch (error) {
    console.error('Error fetching categories:', error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await api.post('/categories', category);
    return response.data.data;
  } catch (error) {
    console.error('Error creating category:', error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await api.put(`/categories/${id}`, category);
    return response.data.data;
  } catch (error) {
    console.error('Error updating category:', error);
    throw error;
  }
};

export const deleteCategoryById = async (id) => {
  try {
    const response = await api.delete(`/categories/${id}`);
    return response.data.changes;
  } catch (error) {
    console.error('Error deleting category:', error);
    throw error;
  }
};