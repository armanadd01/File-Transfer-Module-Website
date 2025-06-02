"use client";

import React from 'react';
import { useTheme } from '../context/ThemeContext';
import { motion } from 'framer-motion';

export const ThemeToggle: React.FC = () => {
  const { theme, resolvedTheme, toggleTheme } = useTheme();
  const isDark = theme === 'dark';
  // const isSystem = theme === 'system';
  // const isSystem = resolvedTheme === 'light' || resolvedTheme === 'dark';
  // const isSystem = theme === 'system' && (resolvedTheme === 'light' || resolvedTheme === 'dark');
  const isResolvedDark = resolvedTheme === 'dark';

  const getThemeDisplay = React.useCallback(() => {
    // if (isSystem) {
    //   return {
    //     icon: (
    //       <svg xmlns="http://www.w3.org/2000/svg" id="Layer_1" data-name="Layer 1" fill="currentColor" viewBox="0 0 24 24" width="15" height="15">
    //         <path d="M5,6.5c0-.83,.67-1.5,1.5-1.5s1.5,.67,1.5,1.5-.67,1.5-1.5,1.5-1.5-.67-1.5-1.5Zm19-1V13.5c0,3.03-2.47,5.5-5.5,5.5h-5v2h3c.83,0,1.5,.67,1.5,1.5s-.67,1.5-1.5,1.5H7.5c-.83,0-1.5-.67-1.5-1.5s.67-1.5,1.5-1.5h3v-2H5.5c-3.03,0-5.5-2.47-5.5-5.5V5.5C0,2.47,2.47,0,5.5,0h13c3.03,0,5.5,2.47,5.5,5.5ZM3,13.5c0,.4,.1,.78,.26,1.12l4.99-4.99c1.51-1.51,3.97-1.51,5.49,0l.63,.64c.34,.34,.9,.34,1.24,0l5.31-5.31c-.25-1.11-1.25-1.94-2.44-1.94H5.5c-1.38,0-2.5,1.12-2.5,2.5V13.5Zm18,0v-4.38l-3.26,3.26c-1.51,1.51-3.97,1.51-5.49,0l-.63-.64c-.34-.34-.9-.34-1.24,0l-4.26,4.26h12.38c1.38,0,2.5-1.12,2.5-2.5Z"/>
    //       </svg>
    //     ),
    //     bgColor: isResolvedDark ? '#1f2937' : '#e2e8f0',
    //     knobColor: isResolvedDark ? '#374151' : '#cbd5e1'
    //   };
    // }
    if (resolvedTheme === 'dark') {
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
    if (resolvedTheme === 'light') {
      return {
        icon: (
          <svg className="w-4 h-4 text-yellow-800" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
          </svg>
        ),
        bgColor: '#dbeafe',
        knobColor: '#fcd34d'
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDark, isResolvedDark]);

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
        <span className="absolute -bottom-14 opacity-0 group-hover:opacity-100 mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-sm transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          {/* {isSystem ? `Using system preference (${resolvedTheme})` : `Currently in ${theme} mode`}<br /> */}
          { `Currently in ${theme} mode`}<br />
          Click to cycle through modes
        </span>
        <motion.div 
          className="w-6 h-6 rounded-full shadow-md flex items-center justify-center"
          initial={false}
          animate={{ 
            // x: isSystem ? 16 : isDark ? 32 : 0,
            x: resolvedTheme === "light" ? 0 : resolvedTheme === "dark" ? 32 : isDark ? 32 : 0,
            // x: isDark ? 32 : 0,
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
