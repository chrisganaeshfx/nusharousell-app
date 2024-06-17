import React from 'react';

export default function Categories() {
  const categories = [
    'Clothing',
    'Household Items',
    'Food',
    'Others',
  ];

  return (
    <>
      <div className="WelcomeBack">
        <h2>Welcome Back user! What would you like to find?</h2>
      </div>
      <div className="categories">
        {categories.map((category, index) => (
          <button
            key={index}
            className="category-button"
            onClick={() => console.log(`Selected Category: ${category}`)}
          >
            {category}
          </button>
        ))}
      </div>
    </>
  );
}