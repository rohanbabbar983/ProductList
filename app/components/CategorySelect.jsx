import React from 'react';

const CategorySelect = ({ categories, selectedCategory, onSelectCategory }) => {
  return (
    <div className="min-w-1/4"> {/* Responsive width */}
      <select
        value={selectedCategory}
        onChange={(e) => onSelectCategory(e.target.value)}
        className="p-2 border rounded w-full" 
      >
        <option value="">All Categories</option>
        {categories.map((category) => (
          <option key={category.slug} value={category.slug}>
            {category.name}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelect;
