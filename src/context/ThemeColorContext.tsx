"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';

type ColorTheme = 'default' | 'blue' | 'green' | 'amber' | 'rose' | 'purple' | 'orange' | 'teal' | 'mono' | 'scaled';

interface ColorThemeContextType {
  colorTheme: ColorTheme;
  setColorTheme: (theme: ColorTheme) => void;
}

const ColorThemeContext = createContext<ColorThemeContextType | undefined>(undefined);

export const ColorThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [colorTheme, setColorTheme] = useState<ColorTheme>('default');

  // Load saved color theme preference
  useEffect(() => {
    const savedColorTheme = localStorage.getItem('colorTheme') as ColorTheme | null;
    if (savedColorTheme && [
      'default', 'blue', 'green', 'amber', 'rose', 'purple', 'orange', 'teal', 'mono', 'scaled'
    ].includes(savedColorTheme)) {
      setColorTheme(savedColorTheme);
    }
  }, []);

  // Apply color theme to document
  useEffect(() => {
    if (colorTheme === 'default') {
      document.documentElement.removeAttribute('data-color-theme');
    } else {
      document.documentElement.setAttribute('data-color-theme', colorTheme);
    }
    // Save theme preference
    localStorage.setItem('colorTheme', colorTheme);
  }, [colorTheme]);

  return (
    <ColorThemeContext.Provider value={{ colorTheme, setColorTheme }}>
      {children}
    </ColorThemeContext.Provider>
  );
};

export const useColorTheme = (): ColorThemeContextType => {
  const context = useContext(ColorThemeContext);
  if (context === undefined) {
    throw new Error('useColorTheme must be used within a ColorThemeProvider');
  }
  return context;
};
