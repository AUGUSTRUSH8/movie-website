// src/components/MenuList.js
import React from 'react';

const MenuList = ({ categories, onCategorySelect }) => (
  <div className="menu-list">
    {categories.map(category => (
      <div key={category.name} className="menu-category">
        <h3 className="category-title">{category.name}</h3>
        <ul className="subcategory-list">
          {category.subcategories.map(sub => (
            <li
              key={sub}
              className="subcategory-item"
              onClick={() => onCategorySelect(category.name, sub)}
            >
              {sub}
            </li>
          ))}
        </ul>
      </div>
    ))}
  </div>
);

export default MenuList;

