'use client';

import React, { useState } from 'react';
import { TransferUploadForm } from '@/components/forms/TransferUploadForm';

export default function TransfersPage() {
  const [activeTab, setActiveTab] = useState('sent');

  return (
    <div className="p-8 bg-white dark:bg-gray-800 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Transfers</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-8">Check the download status or edit, forward or delete them</p>
        
        <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
          <nav className="flex gap-8">
            <button
              onClick={() => setActiveTab('sent')}
              className={`pb-4 text-sm font-medium transition-colors duration-150 ${
                activeTab === 'sent'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Sent
            </button>
            <button
              onClick={() => setActiveTab('requested')}
              className={`pb-4 text-sm font-medium transition-colors duration-150 ${
                activeTab === 'requested'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Requested
            </button>
            <button
              onClick={() => setActiveTab('received')}
              className={`pb-4 text-sm font-medium transition-colors duration-150 ${
                activeTab === 'received'
                  ? 'border-b-2 border-blue-500 text-blue-600 dark:text-blue-400'
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300'
              }`}
            >
              Received
            </button>
          </nav>
        </div>

        <div className="mb-8">
          <input
            type="text"
            placeholder="Search by title, file name, or email"
            className="w-full p-4 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-150"
          />
        </div>

        {activeTab === 'sent' && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">All the transfers you send will appear here</h2>
            <p className="text-gray-600 dark:text-gray-400">Check the download status or edit, forward or delete them</p>
          </div>
        )}

        {activeTab === 'requested' && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Find your file requests here</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">Request up to 3 GB transfers from anyone. Explain what you need, track activity, and manage uploads in one place.</p>
            <TransferUploadForm />
          </div>
        )}

        {activeTab === 'received' && (
          <div className="text-center py-16">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Files shared with you will appear here</h2>
            <p className="text-gray-600 dark:text-gray-400">Download and manage the files you receive</p>
          </div>
        )}
      </div>
    </div>
  );
}
