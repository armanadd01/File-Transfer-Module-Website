'use client';

import React from 'react';
import { Header } from '@/components/Header';
import ChildPages from '@/components/ChildPages';
import FileUpload from '@/components/FileUpload';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { NavigationProvider } from '@/context/NavigationContext';

export default function Home() {
  return (
    <NavigationProvider>
      <div className="flex flex-col min-h-screen">
        
        <ResizablePanelGroup direction="horizontal" >
          <ResizablePanel defaultSize={45} className="sidebar-area">
                <Header title="Dashboard" />
            <div className="flex-1 border-t border-gray-200 dark:border-gray-700">
              <ChildPages />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={55} className="upload-area">
            <div>
              <FileUpload />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </NavigationProvider>
  );
}
