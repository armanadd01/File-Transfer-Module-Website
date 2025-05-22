'use client';

import { forwardRef, useImperativeHandle, useEffect } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { formatFileSize } from '@/lib/utils';
import Image from 'next/image';
import type { DropzoneFile } from 'dropzone';
import Dropzone from 'dropzone';

// Add Dropzone CSS
Dropzone.autoDiscover = false;

export interface FileUploadHandle {
  uploadFiles: () => Promise<void>;
  files: File[];
}

type FileUploadProps = React.HTMLAttributes<HTMLDivElement>;

export const FileUpload = forwardRef<FileUploadHandle, FileUploadProps>(({ className = '', ...props }, ref) => {

  const {
    files,
    isUploading,
    progress,
    error,
    handleFiles,
    uploadFiles,
    clearFiles,
    setState
  } = useFileUpload({
    maxSize: 2 * 1024 * 1024 * 1024, // 2GB
  });

  type FileUploadState = {
    files: File[];
    isUploading: boolean;
    progress: number;
    error: string | null;
  };

  useImperativeHandle(ref, () => ({
    uploadFiles,
    files: files,
  }));

  useEffect(() => {
    const dropzone = new Dropzone('#upload-zone', {
      url: '/api/upload', // We'll create this API endpoint later
      acceptedFiles: 'image/*',
      maxFilesize: 10, // MB
      addRemoveLinks: true,
      dictDefaultMessage: 'Drop files here or click to upload',
      previewTemplate: `
        <div class="dz-preview dz-file-preview">
          <div class="dz-image">
            <img data-dz-thumbnail />
          </div>
          <div class="dz-details">
            <div class="dz-filename"><span data-dz-name></span></div>
            <div class="dz-size"><span data-dz-size></span></div>
          </div>
          <div class="dz-progress"><span class="dz-upload" data-dz-uploadprogress></span></div>
          <div class="dz-error-message"><span data-dz-errormessage></span></div>
        </div>
      `,
      init: function() {
        this.on('addedfile', (file: DropzoneFile) => {
          handleFiles([file as File]);
        });
        this.on('uploadprogress', (file: DropzoneFile, progress: number) => {
          setState((prev: FileUploadState) => ({ ...prev, progress }));
        });
        this.on('success', () => {
          setState(prev => ({
            ...prev,
            isUploading: false,
            progress: 100,
            files: [],
          }));
        });
        this.on('error', (file: DropzoneFile, errorMessage: string | Error) => {
          setState(prev => ({
            ...prev,
            isUploading: false,
            error: typeof errorMessage === 'string' ? errorMessage : errorMessage.message || 'Upload failed',
          }));
        });
      }
    });

    return () => {
      dropzone.destroy();
    };
  }, [handleFiles, setState]);

  return (
    <div className={`w-full ${className}`} {...props}>
      <input type="file" className="hidden" multiple accept="image/*" onChange={e => {
        if (e.target.files) {
          handleFiles(Array.from(e.target.files));
        }
      }} />
      
      <div
        id="upload-zone"
        className="dropzone relative p-8 border-2 border-dashed rounded-lg hover:bg-gray-50 dark:hover:bg-gray-900/50 transition-colors"
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
