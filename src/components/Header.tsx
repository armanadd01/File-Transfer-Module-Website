"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ThemeToggle } from './ThemeToggle';
import { useNavigation } from '@/context/NavigationContext';
import { ProfileDropdown } from './ProfileDropdown';
import { cn } from '@/lib/utils';
import React from 'react';

interface HeaderProps {
  showBackButton?: boolean;
  onBack?: () => void;
  title?: string;
}

export function Header({ showBackButton, onBack, title }: HeaderProps) {
  // Make useNavigation optional to handle cases when Header is used outside NavigationProvider
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigation = { activePage: '', setActivePage: (page: string) => {} };
  try {
    const nav = useNavigation();
    if (nav) {
      navigation.activePage = nav.activePage;
      navigation.setActivePage = nav.setActivePage;
    }
  } catch {
    // NavigationProvider not available, use default values
    console.log('Navigation context not available');
  }
  
  return (
    <>
      <header className="border-b">
        <div className="flex items-center justify-between h-16 px-4">
          <div className="flex items-center space-x-4">
            {showBackButton && (
              <button
                onClick={onBack}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
            )}
            <Link href="/">
              <Image
                src="https://assets.multilat.xyz/branding/logos/multilat-logo.svg"
                alt="Logo"    
                width={96}
                height={32}
                // className=" dark:invert"
              />
            </Link>
            {showBackButton && (
              title && <h1 className="text-xl font-semibold">{title}</h1>
              )}
          </div>
          {!showBackButton && (
            <nav className="hidden md:flex gap-6">
              {[
                { id: 'upload-form', name: 'Upload Form' },
                { id: 'transfers', name: 'Transfers' },
                // { id: 'history', name: 'History' },
                { id: 'pricing', name: 'Pricing' },
                { id: 'branding', name: 'Branding' },
                // { id: 'reviews', name: 'Reviews' },
              ].map(({ id, name }) => (
                <button
                  key={id}
                  className={cn(
                    'text-sm font-medium transition-colors hover:text-primary',
                    navigation.activePage === id
                      ? 'text-black dark:text-white'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => navigation.setActivePage(id)}
                >
                  {name}
                </button>
              ))}
            </nav>
          )}
          <div className="flex items-center gap-4">
            <ThemeToggle />
            {/* <Link href="/upload" className="hidden md:block">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                Upload
              </button>
            </Link> */}
            <ProfileDropdown />
          </div>
        </div>
      </header>
    </>
      
      
      
  );
}