import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-4">Welcome to Our Product Store!</h1>
        <p className="text-lg mb-4">Loading your products...</p>
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500 mx-auto mb-4"></div>
      </div>
    </div>
  );
};

export default LoadingPage;
