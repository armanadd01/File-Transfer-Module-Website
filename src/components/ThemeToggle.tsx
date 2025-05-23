"use client";

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  const isSystem = theme === 'system';
  const isResolvedDark = resolvedTheme === 'dark';

  const getThemeDisplay = React.useCallback(() => {
    if (isSystem) {
      return {
        icon: (
          <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
            <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
          </svg>
        ),
        bgColor: isResolvedDark ? '#1f2937' : '#e2e8f0',
        knobColor: isResolvedDark ? '#374151' : '#cbd5e1'
      };
    }
    if (isDark) {
      return {
        icon: (
          <svg className="w-4 h-4 text-indigo-200" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        ),
        bgColor: '#312e81',
        knobColor: '#e0e7ff'
      };
    }
    return {
      icon: (
        <svg className="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
        </svg>
      ),
      bgColor: '#dbeafe',
      knobColor: '#fcd34d'
    };
  }, [isDark, isSystem, isResolvedDark]);

  const themeDisplay = getThemeDisplay();

  return (
    <div className="relative group">
      <motion.button
        onClick={toggleTheme}
        className="w-16 h-8 rounded-full p-1 flex items-center transition-colors duration-300"
        initial={false}
        animate={{ backgroundColor: themeDisplay.bgColor }}
        whileTap={{ scale: 0.95 }}
        aria-label={`Switch theme mode (currently ${theme} mode)`}
      >
        <span className="absolute opacity-0 group-hover:opacity-100 bottom-full mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-sm transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          {isSystem ? `Using system preference (${resolvedTheme})` : `Currently in ${theme} mode`}<br />
          Click to cycle through modes
        </span>
        <motion.div 
          className="w-6 h-6 rounded-full shadow-md flex items-center justify-center"
          initial={false}
          animate={{ 
            x: isSystem ? 16 : isDark ? 32 : 0,
            backgroundColor: themeDisplay.knobColor
          }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        >
          {themeDisplay.icon}
        </motion.div>
      </motion.button>
    </div>
  );
};
