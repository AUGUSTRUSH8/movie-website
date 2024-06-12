import React, { useState } from 'react';

const MenuList = ({ categories, onCategorySelect }) => {
  // 使用useState来创建一个状态，初始值为null，表示没有类别被展开
  const [expandedCategory, setExpandedCategory] = useState(null);

  // 点击类别标题时的处理函数
  const handleCategoryClick = (categoryName) => {
    // 如果点击的类别已经展开，则折叠；否则，展开
    setExpandedCategory(expandedCategory === categoryName ? null : categoryName);
  };

  return (
    <div className="menu-list">
      {categories.map(category => (
        <div key={category.name} className="menu-category">
          <h3 className="category-title" onClick={() => handleCategoryClick(category.name)}>
            {category.name}
          </h3>
          {expandedCategory === category.name && (
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
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuList;
