import Image from 'next/image';
import { formatFileSize } from '../lib/fileUtils';

interface FilePreviewProps {
  file: File;
  onRemove?: () => void;
  preview?: string;
}

export const FilePreview = ({ file, onRemove, preview }: FilePreviewProps) => {
  return (
    <div className="flex items-center p-4 bg-gray-50 dark:bg-gray-800/50 rounded-lg transition-colors duration-150">
      <div className="flex-1 flex items-center">
        {preview && file.type.startsWith('image/') && (
          <div className="relative w-12 h-12 mr-4 rounded overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700">
            <Image 
              src={preview} 
              alt={file.name}
              fill
              className="object-cover" 
            />
          </div>
        )}
        <div>
          <p className="font-medium truncate text-gray-900 dark:text-gray-100">{file.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">{formatFileSize(file.size)}</p>
        </div>
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="p-2 text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors duration-150"
        >
          Remove
        </button>
      )}
    </div>
  );
};