'use client';

import { Header } from "@/components/Header";
import ChildPages from "@/components/ChildPages";
import FileUpload from '@/components/FileUpload';
import { useRef } from 'react';
import { NavigationProvider } from '@/context/NavigationContext';

export default function Home() {
  const uploadRef = useRef<{ uploadFiles: () => Promise<void>; files: File[]; clearFiles: () => void } | null>(null);

  // const handleUpload = () => {
  //   uploadRef.current?.uploadFiles();
  // };

  // const handleClear = () => {
  //   uploadRef.current?.clearFiles();
  // };

  return (
    <NavigationProvider>
      <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
        <main className="flex flex-col min-h-screen">
          <div className="flex flex-1">
            <div className="w-[60%] h-screen bg-white dark:bg-gray-900  transition-colors duration-300">
            <FileUpload ref={uploadRef} />
              {/* <div className="max-w-2xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Welcome to File Transfer</h1>
                <p className="text-gray-600 dark:text-gray-400 mb-8">Let&apos;s get started with your file transfer. Drop your files below or click to browse.</p>
                <div className="space-y-8">
                  
                  
                </div>
              </div> */}
            </div>
            <div className="w-[40%] h-screen bg-white dark:bg-gray-900 shadow-lg border-l border-gray-200 dark:border-gray-700 transition-colors duration-300">
              <Header />
              <ChildPages />
            </div>
          </div>
        </main>
      </div>
    </NavigationProvider>
  );
}
