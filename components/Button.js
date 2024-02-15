import React from 'react';

const AddRecipeButton = ({ onClick }) => {
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
      ＋ 新しいレシピ
    </button>
  );
};

export default AddRecipeButton;