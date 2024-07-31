import React from "react";
import Modal from "./Modal";

const AddSubtractModal = ({ show, handleClose, addSubtractAmount, sign, id }) => {
    return (
        <Modal show={show} handleClose={handleClose}>
            <h2>{sign === '+' ? 'Add Amount' : 'Subtract Amount'}</h2>
            <form onSubmit={(e) => {
                e.preventDefault();
                const addValue = parseFloat(e.target.addValue.value) * (sign === '+' ? 1 : -1); // Get the value to add
                addSubtractAmount(id, addValue);
                e.target.reset();
                handleClose();
            }}>
            <div className='info'>
                <label>
                Amount: 
                <input type='number' name='addValue' min='0.01' max='100000' step='0.01' required />
                </label>
            </div>
            <div className='modal-btns'>
                <button type='submit'>{sign === '+' ? 'Add' : 'Subtract'}</button>
            </div>
            </form>
        </Modal>
    );
};

export default AddSubtractModal;