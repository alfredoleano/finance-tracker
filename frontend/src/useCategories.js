import { useState, useEffect } from "react";
import { getCategories, createCategory, updateCategory, deleteCategoryById } from './api';


const useCategories = () => {
    // State to manage the list of categories
    const [categories, setCategories] = useState([]);
  
    // State to keep track of total value
    const [totalMaxValue, setTotalMaxValue] = useState(0);

    // State to keep track of value
    const [totalValue, setTotalValue] = useState(0);

    // Get data from database and set it into categories
    useEffect(() => {
        const fetchCategories = async () => {
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Error fetching categories:', error);
        }
        };

        fetchCategories();
    }, []);

    // Calculate the new total values when categories is updated
    useEffect(() => {
        // Calculating new value
        const newValues = categories.reduce((accumulator, category) => {
            return accumulator + category.value;
        },0);

        setTotalValue(newValues);

        // Calculating new total value
        const newTotal = categories.reduce((accumulator, category) => {
            return accumulator + category.maxValue;
        }, 0);
        
        setTotalMaxValue(newTotal);
    }, [categories]);

    // Function to add a new category
    const addCategory = async (name, maxValue) => {
        try{
            // Create a new category object (id is not included bc that is generated in the backend)
            const newCategory = { name, value: 0, maxValue};

            // Send the request to create a new category in the backend
            const data = await createCategory(newCategory);

            // Update the local categories state with the new category
            setCategories([...categories, data]);
        } catch (error) {
        // Handle any errors that occurred during the API call
        console.error('Error adding category:', error);
        }
    };

    // Function to add or subtract amount in category budget
    const addSubtractAmount = async (id, addValue) => {
        try {
            // Find the category to be updated
            const category = categories.find(category => category.id === id);

            // Create a new object with the updated value
            const updatedCategory = {
                ...category,
                value: category.value + addValue
            };

            // Call the API function to update the category in the backend
            const data = await updateCategory(id, updatedCategory);

            // Update the categories state with the response data
            setCategories(categories.map(category => 
                category.id === id ? data : category
            ));
        } catch (error) {
        console.error('Error updating category:', error);
        }
    };

    // Function to delete a category
    const deleteCategory = async (id) => {
        try {
            // Call the API to delete the category in the backend
            await deleteCategoryById(id);

            // Delete the category with the matching id in the categories state
            setCategories(categories.filter(category => category.id !== id));
        } catch (error) {
        console.error('Error deleting category:', error);
        }
    }

    // Function to change all the values of a category
    const changeValues = async (id, limit, value) => {
        try {
            // Find the category by id
            const category = categories.find(category => category.id === id);

            // Create the updated category object
            const updatedCategory = { 
                ...category,
                value: value,
                maxValue: limit
            }

            // Send the updated category to the backend
            await updateCategory(id, updatedCategory);

            // Update the categories state, replaces the category with the updated values if the id matches
            setCategories(categories.map(category => 
                category.id === id ? updatedCategory : category
            ));
        } catch (error) {
        console.error('Error changing values:', error);
        }
    }

    return {
        categories,
        totalMaxValue,
        totalValue,
        addCategory,
        addSubtractAmount,
        changeValues,
        deleteCategory
    };
};

export default useCategories;