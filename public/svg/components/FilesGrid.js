import React from 'react';
import Image from 'next/image';

const categoriesGridStyles = {
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '840px',
    height: '100%',
    maxHeight: '600px', // Adjust based on your needs
    overflowY: 'scroll',
    margin: '0 auto',
    justifyContent: 'left',
    // marginLeft: '250px',
    padding: '20px',
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    margin: '10px', // Adjust as needed
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
  title: {
    margin: '0',
    justifyContent: 'flex-start',
    textAlign: 'left', // Ensure text is aligned to the left
    paddingLeft: '10px',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    marginTop: '5px', // Adjust based on your needs
    justifyContent: 'flex-start', // Align content to the start (left)
    paddingLeft: '10px',
  },
  icon: {
    marginRight: '5px', // Space between icon and text
    // width: '20px',
    // height: '17px',
    // marginLeft: '8px',
  },
};

const CategoriesGrid = ({ categories, onCategoryClick }) => (
  <div style={categoriesGridStyles.container}>
    {categories.map((category, index) => (
      <div key={index} style={categoriesGridStyles.buttonContainer}>
        <button
          style={categoriesGridStyles.button}
          onClick={() => onCategoryClick(category)}
        >
          {category}
        </button>
        {/* <p style={categoriesGridStyles.title}>
          Title {category}
        </p> */}
        <div style={categoriesGridStyles.iconContainer}>
          <Image src="/svg/Like.svg" alt="Like" width={20} height={17} style={categoriesGridStyles.icon} />
          <span>672</span>
        </div>
      </div>
    ))}
  </div>
);

export default CategoriesGrid;
