import React from 'react';

const categoriesGridStyles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '1000px',
    height: '100%',
    maxHeight: '400px', // Adjust based on your needs
    overflowY: 'scroll',
    margin: '0 auto',
    justifyContent: 'left',
    marginLeft: '10px',
    padding: '20px',
    // marginLeft: '120px'
    
    // alignItems: 'center',
    
  },
  button: {
    width: '215px',
    height: '100px',
    margin: '10px', // Adjust as needed
    backgroundColor: '#4CA0FA', // Example background color
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    cursor: 'pointer',
    border: 'none',
    outline: 'none',
  },
};

const CategoriesGrid = ({ categories, onCategoryClick }) => (
  <div style={categoriesGridStyles.container}>
    {categories.map((category, index) => (
      <button
        key={index}
        style={categoriesGridStyles.button}
        onClick={() => onCategoryClick(category)}
      >
        {category}
      </button>
    ))}
  </div>
);

export default CategoriesGrid;
