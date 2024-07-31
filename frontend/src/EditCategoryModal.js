import React from "react";
import Modal from "./Modal";

const EditCategoryModal = ({ show, handleClose, changeValues, deleteCategory, currentCategoryId }) => {    
    return (
      <Modal show={show} handleClose={handleClose}>
        <h2>Edit Budget</h2>
        <form onSubmit={(e) => {
          e.preventDefault();
          const value = parseFloat(e.target.value.value);
          const limit = parseFloat(e.target.limit.value);
          changeValues(currentCategoryId, limit, value);
          e.target.reset();
          handleClose(); // Close edit modal
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
            <button type='button' onClick={() => {
              deleteCategory(currentCategoryId);
              handleClose();
            }}>Delete Category</button>
          </div>
        </form>
      </Modal>
    );
};

export default EditCategoryModal;