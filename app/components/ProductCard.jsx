import React from 'react';

const ProductCard = ({ product }) => {
  return (
    <div className="bg-white shadow-md gap-2 rounded-lg p-4 hover:shadow-lg transition duration-300 flex flex-col">
      <img
        src={product.thumbnail}
        alt={product.title}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h2 className="text-lg font-semibold truncate">{product.title}</h2>
      <span className="font-bold bg-gray-800 shadow-md py-1 px-2 -ml-5 rounded-r-md w-24"> 
        <span className="flex items-start justify-center text-white text-sm">${product.price}</span>
      </span>
      <p className="text-sm text-gray-500 mt-1 truncate">{product.description.substring(0, 100)}...</p>
    </div>
  );
};

export default ProductCard;
