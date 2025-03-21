import React from 'react';

const MainContent = ({ children }) => {
  return (
    <div className="flex-1 p-6 bg-gray-100">
      {children}
    </div>
  );
};

export default MainContent;