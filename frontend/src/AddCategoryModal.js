import React from "react";
import Modal from "./Modal";

const AddCategoryModal = ({ show, handleClose, addCategory}) => {
    return (
        <Modal show={show} handleClose={handleClose}>
            <h2>Add New Category</h2>
            <form onSubmit={(e) => {
            e.preventDefault(); // Prevent the default form submission behavior
            const name = e.target.elements.categoryName.value; // Get the name from the input field
            const maxValue = parseInt(e.target.elements.valueInput.value); // Get the value from the input field
            addCategory(name, maxValue); // Add new category
            e.target.reset();
            handleClose(); // Close the add category modal

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
    );
};

export default AddCategoryModal;