'use client';

import React from 'react';

export default function BrandingPage() {
  return (
    <div className="p-8 bg-white dark:bg-gray-800 min-h-screen transition-colors duration-300">
      <div className="max-w-6xl mx-auto">
        <div className="mb-12">
          <h1 className="text-3xl font-bold mb-2 text-gray-900 dark:text-white">Brand</h1>
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-400">Free plan</span>
            <button className="px-4 py-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-150">
              Upgrade
            </button>
          </div>
        </div>

        <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8 mb-12">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Create a branded transfer portal of your own</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-8">Make your transfers stand out with your own logo, background, and colors. Link to a custom domain, and get started with branding.</p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-150">
            Upgrade
          </button>
        </div>

        <div className="space-y-12">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Edit your images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Logo</label>
                <div className="h-32 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                  <button className="p-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Recommended size: 200x200px</p>
              </div>

              <div className="space-y-4">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Background</label>
                <div className="h-32 bg-gray-100 dark:bg-gray-600 rounded-lg flex items-center justify-center">
                  <button className="p-4 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </button>
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Recommended size: 1920x1080px</p>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Get more from your workspace</h3>
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-8">
              <p className="text-gray-600 dark:text-gray-400 mb-4">Upgrade to create a custom URL and enable creative tools.</p>
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-150">
                Upgrade
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
