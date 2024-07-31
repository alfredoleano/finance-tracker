import React from 'react';
import useCategories from './useCategories';
import useModals from './useModals';
import './App.css';
import CircularMeter from './CircularMeter';
import AddCategoryModal from './AddCategoryModal';
import EditCategoryModal from './EditCategoryModal';
import AddSubtractModal from './AddSubtractModal';

function App() {
  const {
    showAddCategoryModal,
    showEditModal,
    showAddSubtractModal,
    currentCategoryId,
    currentSign,
    handleOpenAddCategoryModal,
    handleCloseAddCategoryModal,
    handleOpenEditModal,
    handleCloseEditModal,
    handleOpenAddSubtractModal,
    handleCloseAddSubtractModal
  } = useModals();

  const {
    categories,
    totalMaxValue,
    totalValue,
    addCategory,
    addSubtractAmount,
    changeValues,
    deleteCategory
  } = useCategories();
  
  return (
    <div className="App">
      <h1>Conscience Spending Plan</h1>

      <div className='category'>
        <div className='category-item'>
          <h2>Total</h2>
          <CircularMeter value={totalValue} maxValue={totalMaxValue} />
          <p>${Number.isInteger(totalValue) ? totalValue : totalValue.toFixed(2)} / {totalMaxValue}</p>
        </div>

        {categories.map((category) => (
          <div key={category.id} className='category-item'>
            <h2>{category.name}</h2>
            <CircularMeter value={category.value} maxValue={category.maxValue} />
            <p>${Number.isInteger(category.value) ? category.value : category.value.toFixed(2)} / {Number.isInteger(category.maxValue) ? category.maxValue : category.maxValue.toFixed(2)}</p>
            <div className='btn-container'>
              <div className='plus-minus'>
                <button onClick={() => handleOpenAddSubtractModal(category.id, '-')}>-</button>
                <button onClick={() => handleOpenAddSubtractModal(category.id, '+')}>+</button>
              </div>
              <button className='btn-edit' onClick={() => handleOpenEditModal(category.id)}>Edit</button>
            </div>
          </div>
        ))}
      </div>

      <button onClick={handleOpenAddCategoryModal} className='add-category'>Add Category</button>

      <AddCategoryModal show={showAddCategoryModal} handleClose={handleCloseAddCategoryModal} addCategory={addCategory} />
      <EditCategoryModal show={showEditModal} handleClose={handleCloseEditModal} changeValues={changeValues} deleteCategory={deleteCategory} currentCategoryId={currentCategoryId}/>
      <AddSubtractModal show={showAddSubtractModal} handleClose={handleCloseAddSubtractModal} addSubtractAmount={addSubtractAmount} sign={currentSign} id={currentCategoryId}/>
    </div>
  );
}

export default App;