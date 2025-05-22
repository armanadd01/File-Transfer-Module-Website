import { useState } from 'react';

export const TransferForm = () => {
  const [email, setEmail] = useState('');
  const [files, setFiles] = useState<File[]>([]);

  const handleAddFiles = () => {
    // Add file handling logic
  };

  return (
    <div className="bg-white rounded-xl p-6 w-[400px] shadow-lg">
      <div className="flex gap-4 mb-6">
        <button 
          onClick={handleAddFiles}
          className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg"
        >
          Add files
        </button>
        <button className="flex-1 py-3 px-4 bg-blue-600 text-white rounded-lg">
          Add folders
        </button>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-600">Get unlimited transfers</p>
        <p className="text-sm text-purple-600 cursor-pointer">Upgrade here</p>
      </div>
      <div className="space-y-4">
        <input
          type="email"
          placeholder="Your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 border rounded-lg"
        />
        <input
          type="text"
          placeholder="Title"
          className="w-full p-3 border rounded-lg"
        />
        <div className="flex items-center gap-2">
          <span className="text-sm">Expires in</span>
          <select className="p-2 border rounded">
            <option>7 days</option>
            <option>14 days</option>
            <option>30 days</option>
          </select>
        </div>
        <button className="w-full py-3 bg-blue-600 text-white rounded-lg">
          Continue
        </button>
      </div>
    </div>
  );
};