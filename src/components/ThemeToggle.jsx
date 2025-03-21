import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useContext(ThemeContext);

  return (
    <button
      onClick={toggleTheme}
      className="fixed bottom-8 right-8 p-4 bg-gray-500 text-white rounded-full shadow-lg hover:bg-purple-600 transition duration-300"
    >
      {isDarkMode ? '🌞' : '🌙'}
    </button>
  );
};

export default ThemeToggle;