import { useState, useEffect } from "react";

const useModals = () => {
    // State to manage the visibility of the add category modal
    const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);

    // State to manage the visibility of the edit modal
    const [showEditModal, setShowEditModal] = useState(false);

    // State to manage the visiblity of the Add/Subtract modal
    const [showAddSubtractModal, setShowAddSubtractModal] = useState(false);
  
    // State to keep track of the current category id when adding an amount
    const [currentCategoryId, setCurrentCategoryId] = useState(null);

    // State to keep track of '-' or '+' when user is adding or subtracting an amount
    const [currentSign, setCurrentSign] = useState(null);

    // Function to open the add category modal
    const handleOpenAddCategoryModal = () => {
        setShowAddCategoryModal(true);
    };

    // Function to close the add category modal
    const handleCloseAddCategoryModal = () => {
        setShowAddCategoryModal(false);
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

    // Inside your component
    useEffect(() => {
        console.log('Before updating currentCategoryId:', currentCategoryId);
    }, [currentCategoryId]);

    // Function to open the add/subtract modal
    const handleOpenAddSubtractModal = (id, sign) => {
        console.log('Setting id to:' , id);
        setCurrentCategoryId(id);
        setCurrentSign(sign);
        setShowAddSubtractModal(true);
    }

    // debugging
    // Use effect to log the currentCategoryId when it updates
    useEffect(() => {
        console.log('After updating curentCategoryId: ', currentCategoryId); // This will log the updated ID
    }, [currentCategoryId]);

    // Function to close the add/subtract modal
    const handleCloseAddSubtractModal = () => {
        setShowAddSubtractModal(false);
        setCurrentCategoryId(null);
        setCurrentSign(null);
    }

    return {
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
    };
};

export default useModals;