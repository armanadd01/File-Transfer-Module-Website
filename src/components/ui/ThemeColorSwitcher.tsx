"use client";

import React from 'react';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/Button';
import { useColorTheme } from '@/context/ThemeColorContext';

type ColorTheme = 'default' | 'blue' | 'green' | 'amber' | 'rose' | 'purple' | 'orange' | 'teal' | 'mono' | 'scaled';

interface ColorOption {
  name: ColorTheme;
  label: string;
  color: string;
}

const colorOptions: ColorOption[] = [
  { name: 'default', label: 'Default', color: 'bg-slate-900 dark:bg-slate-50' },
  { name: 'blue', label: 'Blue', color: 'bg-blue-600 dark:bg-blue-500' },
  { name: 'green', label: 'Green', color: 'bg-green-600 dark:bg-green-500' },
  { name: 'amber', label: 'Amber', color: 'bg-amber-600 dark:bg-amber-500' },
  { name: 'rose', label: 'Rose', color: 'bg-rose-600 dark:bg-rose-500' },
  { name: 'purple', label: 'Purple', color: 'bg-purple-600 dark:bg-purple-500' },
  { name: 'orange', label: 'Orange', color: 'bg-orange-600 dark:bg-orange-500' },
  { name: 'teal', label: 'Teal', color: 'bg-teal-600 dark:bg-teal-500' },
  { name: 'mono', label: 'Mono', color: 'bg-gray-600 dark:bg-gray-500' },
  { name: 'scaled', label: 'Scaled', color: 'bg-gray-900 dark:bg-gray-50' },
];

export function ThemeColorSwitcher() {
  const { colorTheme, setColorTheme } = useColorTheme();

  const selectedTheme = colorOptions.find(option => option.name === colorTheme) || colorOptions[0];

  return (
    <div className="relative group">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative h-8 w-8 rounded-full">
            <div className={cn(
              'absolute inset-0 rounded-full flex items-center justify-center',
              selectedTheme.color
            )} />
            <span className="sr-only">Toggle theme color</span>
            <span className="absolute opacity-0 group-hover:opacity-100 -bottom-10 mb-2 left-1/2 transform -translate-x-1/2 px-2 py-1 text-xs font-medium text-white bg-gray-900 dark:bg-gray-700 rounded-md shadow-sm transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              Color theme: {selectedTheme.label}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {colorOptions.map((option) => (
            <DropdownMenuItem
              key={option.name}
              onClick={() => setColorTheme(option.name)}
              className="flex items-center gap-2 cursor-pointer"
            >
              <div className={cn(
                'h-4 w-4 rounded-full',
                option.color
              )} />
              <span>{option.label}</span>
              {colorTheme === option.name && (
                <Check className="h-4 w-4 ml-auto" />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
