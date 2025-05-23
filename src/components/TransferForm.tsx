import { useState } from 'react';

export const TransferForm = () => {
  const [email, setEmail] = useState('');
  // const [_files, _setFiles] = useState<File[]>([]);

  const handleAddFiles = () => {
    // Add file handling logic
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[400px] shadow-lg transition-colors duration-150">
      <div className="flex gap-4 mb-6">
        <button 
          onClick={handleAddFiles}
          className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-150"
        >
          Add files
        </button>
        <button className="flex-1 py-3 px-4 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-150">
          Add folders
        </button>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600 dark:text-gray-400 transition-colors duration-150">Get unlimited transfers</p>
        <p className="text-sm text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 cursor-pointer transition-colors duration-150">Upgrade here</p>
      </div>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-150"
        />
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded-lg placeholder-gray-400 dark:placeholder-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-150"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-700 dark:text-gray-300 transition-colors duration-150">Expires in</span>
          <select className="p-2 border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 rounded focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-transparent transition-colors duration-150">
            <option>7 days</option>
            <option>14 days</option>
            <option>30 days</option>
          </select>
        </div>
        <button className="w-full py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-lg transition-colors duration-150">
          Continue
        </button>
      </div>
    </div>
  );
};