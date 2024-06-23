import React, { useState } from 'react';
import { getBroadCategories, getMainCategories } from '../../GLOBAL/Utils/CategoryUtils';
import '../../styles/CategoryButtons.css';

export default function Categories() {
  const [categorySearch, setCategorySearch] = useState('');

  const handleCategoryClick = (category) => {
    setCategorySearch(category); // Set categorySearch state to trigger search
    // Optionally, you can navigate to a search page or perform a search action here
  };

  return (
    <div className="category-buttons-container">
      <div className="welcome-back">
        <h2>Welcome Back user! What would you like to find?</h2>
      </div>
      <div className="category-buttons">
        {getBroadCategories().map((broadCategory) => (
          <div key={broadCategory} className="dropdown">
            <button className="dropbtn">{broadCategory}</button>
            <div className="dropdown-content">
              {getMainCategories(broadCategory).map((mainCategory) => (
                <a key={mainCategory} onClick={() => handleCategoryClick(mainCategory)}>
                  {mainCategory}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
