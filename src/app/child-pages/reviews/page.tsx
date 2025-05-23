'use client';

import React from 'react';

export default function ReviewsPage() {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">Welcome to fast, focused feedback</h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">Here&apos;s what our customers are saying about us:</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Video - 26 sec</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">A small intro to portals and reviews</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-green-600 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Creating and sharing</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">What does my client see?</p>
              </div>
            </div>
          </div>

          <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                <svg className="w-6 h-6 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Receiving feedback</h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">What is a feedback report?</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Portals</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <button className="p-6 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-150">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Create portal</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">to gather your reviews</p>
            </button>
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">Reviews</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <button className="p-6 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-center hover:border-gray-400 dark:hover:border-gray-500 transition-colors duration-150">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <p className="text-sm font-medium text-gray-900 dark:text-white mb-1">Create review</p>
              <p className="text-xs text-gray-600 dark:text-gray-400">to get feedback on your work</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
