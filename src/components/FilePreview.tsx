import Image from 'next/image';
import { formatFileSize } from '../lib/fileUtils';

interface FilePreviewProps {
  file: File;
  onRemove?: () => void;
  preview?: string;
}

export const FilePreview = ({ file, onRemove, preview }: FilePreviewProps) => {
  return (
    <div className="flex items-center p-4 bg-gray-50 rounded-lg">
      <div className="flex-1">
        {preview && file.type.startsWith('image/') && (
          <div className="relative w-12 h-12 mr-4">
            <Image 
              src={preview} 
              alt={file.name}
              fill
              className="object-cover rounded" 
            />
          </div>
        )}
        <div>
          <p className="font-medium truncate">{file.name}</p>
          <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
        </div>
      </div>
      {onRemove && (
        <button
          onClick={onRemove}
          className="p-2 text-gray-500 hover:text-red-500"
        >
          Remove
        </button>
      )}
    </div>
  );
};