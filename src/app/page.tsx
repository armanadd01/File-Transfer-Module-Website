'use client';

import Link from 'next/link';
import { FileUpload } from '@/components/FileUpload';
import { useRef } from 'react';

export default function Home() {
  const uploadRef = useRef<{ uploadFiles: () => Promise<void>; files: File[] }>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Simple & Fast File Transfer</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300">Send files securely with just a few clicks</p>
        </div>

        <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 border border-gray-200 dark:border-gray-700">
          <FileUpload ref={uploadRef} />

          <div className="mt-8 flex justify-between items-center">
            <Link 
              href="/transfers"
              className="text-sm text-gray-600 dark:text-gray-300 hover:text-blue-500 dark:hover:text-blue-400"
            >
              View transfer history
            </Link>
            <button 
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => uploadRef.current?.uploadFiles()}
              disabled={!uploadRef.current?.files.length}
            >
              Transfer
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
