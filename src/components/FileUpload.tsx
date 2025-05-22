'use client';

import { useCallback, forwardRef, useImperativeHandle } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { formatFileSize } from '@/lib/utils';
import Image from 'next/image';

export interface FileUploadHandle {
  uploadFiles: () => Promise<void>;
  files: File[];
}

type FileUploadProps = React.HTMLAttributes<HTMLDivElement>;

export const FileUpload = forwardRef<FileUploadHandle, FileUploadProps>((props, ref) => {
  const {
    files,
    isUploading,
    progress,
    error,
    handleFiles,
    uploadFiles,
    clearFiles,
  } = useFileUpload({
    maxSize: 2 * 1024 * 1024 * 1024, // 2GB
  });

  useImperativeHandle(ref, () => ({
    uploadFiles,
    files: files,
  }));

  const onDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    handleFiles(e.dataTransfer.files);
  }, [handleFiles]);

  const onDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  }, []);

  const onFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  }, [handleFiles]);

  return (
    <div className="w-full">
      <input
        type="file"
        id="file-upload"
        className="hidden"
        multiple
        onChange={onFileSelect}
      />
      
      <div
        className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-12 text-center cursor-pointer hover:border-blue-500 dark:hover:border-blue-400 transition-colors"
        onDrop={onDrop}
        onDragOver={onDragOver}
        onClick={() => document.getElementById('file-upload')?.click()}
      >
        <div className="flex flex-col items-center gap-4">
          <Image
            src="/upload-cloud.svg"
            alt="Upload"
            width={48}
            height={48}
            className="text-gray-400"
          />
          <div className="text-lg font-medium">
            Drop files here or <span className="text-blue-500">browse</span>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Upload up to 2GB for free
          </p>
        </div>
      </div>

      {error && (
        <div className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg">
          {error.split('\n').map((line, i) => (
            <div key={i} className="mb-1 last:mb-0">{line}</div>
          ))}
        </div>
      )}

      {files.length > 0 && (
        <div className="mt-4 space-y-2">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <div className="text-sm font-medium">{file.name}</div>
                <div className="flex items-center space-x-2 text-xs text-gray-500">
                  <span>{file.type || 'unknown type'}</span>
                  <span>•</span>
                  <span>{formatFileSize(file.size)}</span>
                </div>
              </div>
              <button
                onClick={() => {
                  const newFiles = [...files];
                  newFiles.splice(index, 1);
                  clearFiles();
                }}
                className="text-gray-500 hover:text-red-500"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}

      {isUploading && (
        <div className="mt-4">
          <div className="h-2 bg-gray-200 rounded-full">
            <div
              className="h-2 bg-blue-500 rounded-full transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
});

FileUpload.displayName = 'FileUpload';
