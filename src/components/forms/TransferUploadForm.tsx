'use client';

import React, { useState } from 'react';
// import FileUpload from '../FileUpload';

export const TransferUploadForm = () => {
  const [formData, setFormData] = useState({
    emailTo: '',
    yourEmail: '',
    title: '',
    message: '',
    expiresIn: '7'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="max-w-md w-full mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6 transition-colors duration-150">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Request files</h2>
      <div className="space-y-4">
        {/* <FileUpload /> */}

        <div>
          <label htmlFor="emailTo" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email to</label>
          <input
            type="email"
            id="emailTo"
            name="emailTo"
            value={formData.emailTo}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-150"
            placeholder="Email to"
          />
        </div>
        <div>
          <label htmlFor="yourEmail" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Your email</label>
          <input
            type="email"
            id="yourEmail"
            name="yourEmail"
            value={formData.yourEmail}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-150"
            placeholder="Your email"
          />
        </div>
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-150"
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-150 resize-none"
            placeholder="Message"
          />
        </div>
        <div className="flex items-center gap-4">
          <div className="flex-1">
            <label htmlFor="expiresIn" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Expires in</label>
            <select
              id="expiresIn"
              name="expiresIn"
              value={formData.expiresIn}
              onChange={handleChange}
              className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-150"
            >
              <option value="7">7 days</option>
              <option value="14">14 days</option>
              <option value="30">30 days</option>
            </select>
          </div>
          <button className="p-3 text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
            </svg>
          </button>
        </div>
      </div>
      <button
        className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-150 font-medium"
      >
        Continue
      </button>
    </div>
  );
};
