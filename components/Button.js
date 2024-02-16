import React from 'react';

const AddRecipeButton = ({ onClick, message }) => {
  return (
    <button 
    onClick={onClick}
    style={{
      backgroundColor: 'white',
      color: 'green',
      border: '1px solid green',
      borderRadius: '15px',
      padding: '0.5rem',
      cursor: 'pointer',
    }}
    > 
    {message}
    </button>
  );
};

export default AddRecipeButton;