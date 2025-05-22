'use client';

import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import { formatFileSize } from '@/lib/utils';
import Image from 'next/image';
import type { DropzoneFile } from 'dropzone';
import Dropzone from 'dropzone';
import { motion, AnimatePresence } from 'framer-motion';

Dropzone.autoDiscover = false;

interface FileUploadState {
  files: File[];
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export interface FileUploadHandle {
  uploadFiles: () => Promise<void>;
  files: File[];
  clearFiles: () => void;
}

type FileUploadProps = React.HTMLAttributes<HTMLDivElement>;

const FileUpload = forwardRef<FileUploadHandle, FileUploadProps>(({
  className = '',
  ...props
}, ref) => {
  const [state, setState] = useState<FileUploadState>({
    files: [],
    isUploading: false,
    progress: 0,
    error: null
  });

  const [isDragging, setIsDragging] = useState(false);

  const { files, isUploading, progress, error } = state;

  const handleFiles = (newFiles: File[]) => {
    setState((prev: FileUploadState) => ({
      ...prev,
      files: [...prev.files, ...newFiles],
      error: null,
    }));
  };

  const clearFiles = () => {
    setState((prev: FileUploadState) => ({
      ...prev,
      files: [],
      error: null,
    }));
  };

  const removeFile = (index: number) => {
    setState((prev: FileUploadState) => ({
      ...prev,
      files: prev.files.filter((_, i: number) => i !== index),
    }));
  };

  // Expose methods via ref
  useImperativeHandle<FileUploadHandle, FileUploadHandle>(ref, () => ({
    uploadFiles: async () => {
      setState(prev => ({ ...prev, isUploading: true }));
      // Implement your upload logic here
      // Simulating upload progress
      const interval = setInterval(() => {
        setState(prev => {
          if (prev.progress >= 100) {
            clearInterval(interval);
            return { ...prev, isUploading: false };
          }
          return { ...prev, progress: prev.progress + 10 };
        });
      }, 500);
    },
    files,
    clearFiles,
  }));

  useEffect(() => {
    const dropzone = new Dropzone('#upload-zone', {
      url: '/api/upload',
      acceptedFiles: '*/*',
      maxFilesize: 1024, // 1GB
      addRemoveLinks: true,
      dictDefaultMessage: 'Drop files here or click to upload',
      previewsContainer: false,
      createImageThumbnails: false,
      autoProcessQueue: false,
    });

    dropzone.on('addedfile', (file: DropzoneFile) => {
      handleFiles([file as File]);
    });
    dropzone.on('dragenter', () => setIsDragging(true));
    dropzone.on('dragleave', () => setIsDragging(false));
    dropzone.on('drop', () => setIsDragging(false));
    dropzone.on('error', (_: unknown, message: string | Error) => {
      if (typeof message === 'string') {
        setState((prev: FileUploadState) => ({ ...prev, error: message }));
      } else if (message instanceof Error) {
        setState((prev: FileUploadState) => ({ ...prev, error: message.message }));
      } else {
        setState((prev: FileUploadState) => ({ ...prev, error: 'Upload failed' }));
      }
    });

    return () => {
      dropzone.destroy();
    };
  }, []);

  return (
    <div className={`w-full space-y-6 ${className}`} {...props}>
      <div
        id="upload-zone"
        className={`relative p-8 border-2 border-dashed rounded-xl transition-all duration-200 ${
          isDragging
            ? 'border-primary-500 bg-primary-50 dark:bg-primary-900/10'
            : 'border-gray-300 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500'
        }`}
      >
        <AnimatePresence>
          {files.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-4"
            >
              <div className="p-4 rounded-full bg-primary-50 dark:bg-primary-900/10">
                <Image
                  src="/upload-cloud.svg"
                  alt="Upload"
                  width={32}
                  height={32}
                  className="text-primary-500"
                />
              </div>
              <div className="text-center">
                <h3 className="text-lg font-medium mb-1">
                  Drop files here or click to upload
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Upload up to 2GB for free
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
            >
              {files.map((file, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0">
                      {file.type.startsWith('image/') ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                          <img
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ) : (
                        <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <svg className="w-6 h-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                        {file.name}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatFileSize(file.size)}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
                    >
                      <svg className="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>

                  {isUploading && (
                    <div className="mt-3">
                      <div className="relative pt-1">
                        <div className="flex mb-2 items-center justify-between">
                          <div>
                            <span className="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
                              Uploading
                            </span>
                          </div>
                          <div className="text-right">
                            <span className="text-xs font-semibold inline-block text-primary-600 dark:text-primary-400">
                              {Math.round(progress || 0)}%
                            </span>
                          </div>
                        </div>
                        <div className="overflow-hidden h-2 text-xs flex rounded bg-primary-100 dark:bg-primary-900/20">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.5 }}
                            className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-primary-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {isUploading && (
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="p-4 rounded-full bg-primary-50 dark:bg-primary-900/10">
              <Image
                src="/upload-cloud.svg"
                alt="Upload"
                width={32}
                height={32}
                className="text-primary-500"
              />
            </div>
            <div className="text-center">
              <h3 className="text-lg font-medium mb-1">
                Drop files here or click to upload
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Upload up to 2GB for free
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {files.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-3"
          >
            {files.map((file, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="relative p-4 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700"
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
