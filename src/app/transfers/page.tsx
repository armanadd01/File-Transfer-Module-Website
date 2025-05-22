'use client';

import Link from 'next/link';

export default function TransfersPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      <main className="container mx-auto px-4 py-16">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Transfer History</h1>
          <Link
            href="/"
            className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full font-medium transition-colors"
          >
            New Transfer
          </Link>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
          <div className="p-6">
            <p className="text-gray-500 dark:text-gray-400 text-center">
              No transfers yet. Start by uploading a file!
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
