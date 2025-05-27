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
          <ResizablePanel defaultSize={45}>
            <header className="border-b">
              <div className="flex h-16 items-center  justify-between">
                <Header />
              </div>
            </header>
            <div>
              <ChildPages />
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle />
          <ResizablePanel defaultSize={55}>
            <div>
              <FileUpload />
            </div>
          </ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </NavigationProvider>
  );
}
