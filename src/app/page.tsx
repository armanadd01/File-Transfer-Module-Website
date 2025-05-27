'use client';

import React from 'react';
import { Header } from '@/components/Header';
import ChildPages from '@/components/ChildPages';
import FileUpload from '@/components/FileUpload';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { ProfileDropdown } from '@/components/ProfileDropdown';
import { NavigationProvider } from '@/context/NavigationContext';

export default function Home() {
  return (
    <NavigationProvider>
      <div className="flex flex-col min-h-screen">
        <header className="border-b">
          <div className="flex h-16 items-center px-4 justify-between">
            <Header />
            <ProfileDropdown />
          </div>
        </header>
        <ResizablePanelGroup
          direction="horizontal"
          className="flex-1"
        >
          <ResizablePanel defaultSize={40} maxSize={50}>
            <div className="p-4">
              <ChildPages />
            </div>
          </ResizablePanel>
          <ResizableHandle />
          <ResizablePanel maxSize={50}>
            <div className="p-4">
              <FileUpload />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </NavigationProvider>
  );
}
