import React, { useState, useEffect } from 'react';
import './App.css';
import CircularMeter from './CircularMeter';
import Modal from './Modal';

function App() {
  // State to manage the visibility of the add category modal
  const [showModal, setShowModal] = useState(false);
  
  // State to manage the list of categories
  const [categories, setCategories] = useState([]);
  
  // State to manage the visibility of the add amount modal
  const [showAddModal, setShowAddModal] = useState(false);
  
  // State to manage the visibility of the subtract amount modal
  const [showSubtractModal, setShowSubtractModal] = useState(false);

  // State to manage the visibility of the edit modal
  const [showEditModal, setShowEditModal] = useState(false);
  
  // State to keep track of the current category id when adding an amount
  const [currentCategoryId, setCurrentCategoryId] = useState(null);

  // State to keep track of total value
  const [totalMaxValue, setTotalMaxValue] = useState(0);

  // State to keep track of value
  const [totalValue, setTotalValue] = useState(0);

  // Load data from local storage when the component mounts
  useEffect(() => {
    const savedCategories = localStorage.getItem('categories');
    if (savedCategories) {
      const parsedCategories = JSON.parse(savedCategories);
      setCategories(parsedCategories);
    }
  }, []);

  // Save data to local storage whenever categories change and calculate updated total values
  useEffect(() => {
    // Saving data
    localStorage.setItem('categories', JSON.stringify(categories));

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

  // Function to open the add category modal
  const handleOpenModal = () => {
    setShowModal(true);
  };

  // Function to close the add category modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  // Function to add a new category
  const addCategory = (name, maxValue) => {
    // Create a new category object
    const newCategory = { id: name, name, value: 0, maxValue };
    
    // Update the categories state with the new category
    setCategories([...categories, newCategory]);
    
    // Close the add category modal
    setShowModal(false);
  };

  // Function to open the add amount modal
  const handleOpenAddModal = (id) => {
    setShowAddModal(true);
    setCurrentCategoryId(id);
  };

  // Function to close the add amount modal
  const handleCloseAddModal = () => {
    setShowAddModal(false);
    setCurrentCategoryId(null);
  };

  // Function to open the subtract amount modal
  const handleOpenSubtractModal = (id) => {
    setShowSubtractModal(true);
    setCurrentCategoryId(id);
  };

  // Function to close the subtract amount modal
  const handleCloseSubtractModal = () => {
    setShowSubtractModal(false);
    setCurrentCategoryId(null);
  };

  // Function to open the edit amount modal
  const handleOpenEditModal = (id) => {
    setShowEditModal(true);
    setCurrentCategoryId(id);
  };

  // Function to close the edit amount modal
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setCurrentCategoryId(null);
  };

  // Function to edit amount in category budget
  const editAmount = (id, addValue) => {
    // Update the categories state immutably using map
    setCategories(categories.map(category => 
      // Check if the current category's ID matches the ID passed to the function
      category.id === id
      // If they match, create a new object with the updated value
      ? {...category, value: category.value + addValue }
      // If they don't match, return the category object unchanged
      : category
    ));

    // Close the add amount modal
    handleCloseAddModal();

    // Close the subtract amount modal
    handleCloseSubtractModal();
  }

  // Function to delete a category
  const deleteCategory = (id) => {
    setCategories(categories.filter(category => category.id !== id));
    handleCloseEditModal();
  }

  // Function to change all the values of a category
  const changeValues = (id, limit, value) => {
    setCategories(categories.map(category => 
      category.id === id ? {...category, value: value, maxValue: limit} : category
    ));
    handleCloseEditModal();
  }
  
  return (
    <div className="App">
      <h1>Conscience Spending Plan</h1>

      <div className='category'>
        <div className='category-item'>
          <h2>Total</h2>
          <CircularMeter value={totalValue} maxValue={totalMaxValue} />
          <p>${totalValue} / {totalMaxValue}</p>
        </div>

        {categories.map((category) => (
          <div key={category.id} className='category-item'>
            <h2>{category.name}</h2>
            <CircularMeter value={category.value} maxValue={category.maxValue} />
            <p>${category.value} / {category.maxValue}</p>
            <div className='btn-container'>
              <div className='plus-minus'>
              <button onClick={() => handleOpenSubtractModal(category.id)}>-</button>
              <button onClick={() => handleOpenAddModal(category.id)}>+</button>
              </div>
              <button className='btn-edit' onClick={() => handleOpenEditModal(category.id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleOpenModal} className='add-category'>Add Category</button>

      {/* Modal for adding a new category */}
      <Modal show={showModal} handleClose={handleCloseModal}>
        <h2>Add New Category</h2>
        <form onSubmit={(e) => {
          e.preventDefault(); // Prevent the default form submission behavior
          const name = e.target.elements.categoryName.value; // Get the name from the input field
          const maxValue = parseInt(e.target.elements.valueInput.value); // Get the value from the input field
          addCategory(name, maxValue); // Add new category
          e.target.reset();
        }}>
          <div className='info'>
            <label>
              Name: 
              <input type='text' name='categoryName' required />
            </label>
            <label>
              Budget: 
              <input type='number' name='valueInput' min='1' max='100000' required />
            </label>
          </div>
          <div className='modal-btns'>
            <button type="submit">Add</button>
          </div>
        </form>
      </Modal>

      {/* Modal for adding an amount to a category */}
      <Modal show={showAddModal} handleClose={handleCloseAddModal}>
        <h2>Add Amount</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const addValue = parseFloat(e.target.addValue.value); // Get the value to add
          editAmount(currentCategoryId, addValue);
          e.target.reset();
        }}>
          <div className='info'>
            <label>
              Amount: 
              <input type='number' name='addValue' min='0.01' max='100000' step='0.01' required />
            </label>
          </div>
          <div className='modal-btns'>
            <button type='submit'>Add</button>
          </div>
        </form>
      </Modal>

      {/* Modal for subtracting an amount to a category */}
      <Modal show={showSubtractModal} handleClose={handleCloseSubtractModal}>
        <h2>Subtract Amount</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const subtractValue = parseFloat(e.target.subtractValue.value) * -1; // Get the value to add
          editAmount(currentCategoryId, subtractValue);
          e.target.reset();
        }}>
          <div className='info'>
            <label>
              Amount: 
              <input type='number' name='subtractValue' min='0.01' max='100000' step='0.01' required />
            </label>
          </div>
          <div className='modal-btns'>
            <button type='submit'>Subtract</button>
          </div>
        </form>
      </Modal>

      {/* Modal for editing a category */}
      <Modal show={showEditModal} handleClose={handleCloseEditModal}>
        <h2>Edit Budget</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const value = parseFloat(e.target.value.value);
          const limit = parseFloat(e.target.limit.value);
          changeValues(currentCategoryId, limit, value);
          e.target.reset();
        }}>
          <div className='info'>
            <label>
              Budget Limit: 
              <input type='number' name='limit' min='1' max='100000' step='0.01' required />
            </label>
            <label>
              Budget Value:
              <input type='number' name='value' min='0.01' max='100000' step='0.01' required/>
            </label>
          </div>
          <div className='modal-btns'>
            <button type='submit'>Confirm Changes</button>
            <button type='button' onClick={() => deleteCategory(currentCategoryId)}>Delete Category</button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default App;