'use client';

import React, { useEffect, useState, forwardRef, useImperativeHandle } from 'react';
// import Image from 'next/image';
import type { DropzoneFile } from 'dropzone';
import Dropzone from 'dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import '@/styles/dropzone.css';
import { Card } from './ui/card';

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

  // Track drag state for visual feedback

  // const { files, isUploading, progress, error } = state;
  const { files, error } = state;

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
  
  // Extended type for Dropzone files that includes fullPath and formData
  interface DropzoneFileWithPath extends DropzoneFile {
    fullPath?: string;
    formData?: () => FormData;
  }
  
  // Upload handling is now done through Dropzone's built-in mechanisms
  // and the uploadFiles function

  // const removeFile = (index: number) => {
  //   setState((prev: FileUploadState) => ({
  //     ...prev,
  //     files: prev.files.filter((_, i: number) => i !== index),
  //   }));
  // };

  // Expose methods via ref
  useImperativeHandle<FileUploadHandle, FileUploadHandle>(ref, () => ({
    uploadFiles: async () => {
      if (files.length === 0) return;
      
      setState(prev => ({ ...prev, isUploading: true, progress: 0 }));
      
      try {
        // Process each file with progress updates
        const totalFiles = files.length;
        let completedFiles = 0;
        
        for (const file of files) {
          // Get the full path if it exists
          const fileWithPath = file as unknown as { fullPath?: string };
          const fullPath = fileWithPath.fullPath || file.name;
          
          // Create a FormData object to send the file
          const formData = new FormData();
          formData.append('file', file);
          formData.append('fullPath', fullPath);
          
          // Upload the file to the server
          const response = await fetch('/api/upload', {
            method: 'POST',
            body: formData,
          });
          
          if (!response.ok) {
            throw new Error(`Upload failed with status ${response.status}`);
          }
          
          const result = await response.json();
          console.log(`File ${file.name} uploaded successfully at path ${fullPath}:`, result);
          
          // Update progress
          completedFiles++;
          const progressPercentage = Math.round((completedFiles / totalFiles) * 100);
          setState(prev => ({ ...prev, progress: progressPercentage }));
        }
        
        // Clear files after successful upload
        setState(prev => ({
          ...prev,
          isUploading: false,
          progress: 100,
          files: [],
        }));
      } catch (error) {
        console.error('Upload error:', error);
        setState(prev => ({
          ...prev,
          isUploading: false,
          error: error instanceof Error ? error.message : 'Failed to upload files to server',
        }));
      }
    },
    files,
    clearFiles,
  }));

  useEffect(() => {
    const dropzone = new Dropzone('#upload-zone', {
      // Set the URL to our API endpoint for file uploads
      url: '/api/upload',
      // url: 'javascript:void(0);',
      acceptedFiles: [
        // Image files
        'image/*',
        '.psd', '.tif', '.tiff', '.ai', '.eps', '.svg', '.raw', '.cr2', '.nef', '.orf', '.sr2', '.bmp', '.heic', '.indd', '.xcf',
        // Microsoft Office documents
        '.doc', '.docx', '.xls', '.xlsx', '.ppt', '.pptx',
        // OpenDocument formats
        '.txt', '.rtf', '.csv', '.tsv', '.md', '.xml', '.json', '.yaml', '.yml', '.epub', '.mobi', '.tex', '.log',
        // Apple iWork documents
        '.pages', '.numbers', '.key',
        // Google Docs formats
        '.gdoc', '.gsheet', '.gslides',
        // Other common document formats
        '.txt', '.rtf', '.csv', '.tsv', '.md', '.xml', '.json', '.yaml', '.yml',
        // PDF
        'application/pdf',
        // Programming files
        // '.js', '.ts', '.py', '.java', '.c', '.cpp', '.cs', '.rb', '.php', '.html', '.css', '.json', '.xml', '.sql', '.go', '.swift', '.kt', '.swift', '.kt', '.rs', '.sh', '.bash', '.pl', '.lua', '.yml', '.yaml', '.md', '.csv', '.tsv', '.log', '.conf', '.ini', '.env', '.bat', '.ps1', '.vbs', '.cmd',
        // Audio files
        '.mp3', '.wav', '.ogg', '.flac', '.aac', '.m4a', '.wma', '.opus', '.aiff', '.alac',
        // Video files
        '.mp4', '.mkv', '.avi', '.mov', '.wmv', '.flv', '.webm', '.mpeg', '.mpg', '.3gp', '.m4v', '.ts',
        // Archive and compressed files
        '.zip', '.rar', '.7z', '.tar', '.gz', '.bz2', '.xz', '.iso'
      ].join(','), // Accept all image files, PDFs, microsoft office documents, code archives, RAR, ZIP and common archive formats and compressed formats 
      // maxFiles: 8,
      maxFilesize: 1024, // 1GB
      addRemoveLinks: true,
      // clickable: true,
      // Enable auto processing to upload files automatically
      autoProcessQueue: true,
      // Enable parallel uploads for better performance
      parallelUploads: 108,
      // chunking: true, // Enable chunking for large files
      chunking: true,
      // Folder upload settings
      // uploadMultiple: true,
      // Disable image thumbnails for better performance
      createImageThumbnails: true,
      // Important for Chrome to include directory structure
      forceFallback: false,

      // Allow dropping folders
      dictDefaultMessage: '<div class="flex flex-col items-center justify-center gap-4"><svg xmlns="http://www.w3.org/2000/svg" id="Outline" viewBox="0 0 24 24" class="w-16 h-16 text-gray-400 dark:text-gray-600" width="256" height="256" fill="currentColor"><path d="M18.4,7.379a1.128,1.128,0,0,1-.769-.754h0a8,8,0,1,0-15.1,5.237A1.046,1.046,0,0,1,2.223,13.1,5.5,5.5,0,0,0,.057,18.3,5.622,5.622,0,0,0,5.683,23H11a1,1,0,0,0,1-1h0a1,1,0,0,0-1-1H5.683a3.614,3.614,0,0,1-3.646-2.981,3.456,3.456,0,0,1,1.376-3.313A3.021,3.021,0,0,0,4.4,11.141a6.113,6.113,0,0,1-.073-4.126A5.956,5.956,0,0,1,9.215,3.05,6.109,6.109,0,0,1,9.987,3a5.984,5.984,0,0,1,5.756,4.28,2.977,2.977,0,0,0,2.01,1.99,5.934,5.934,0,0,1,.778,11.09.976.976,0,0,0-.531.888h0a.988.988,0,0,0,1.388.915c4.134-1.987,6.38-7.214,2.88-12.264A6.935,6.935,0,0,0,18.4,7.379Z"/><path d="M18.707,16.707a1,1,0,0,0,0-1.414l-1.586-1.586a3,3,0,0,0-4.242,0l-1.586,1.586a1,1,0,0,0,1.414,1.414L14,15.414V23a1,1,0,0,0,2,0V15.414l1.293,1.293a1,1,0,0,0,1.414,0Z"/></svg><div class="text-lg text-center font-medium text-gray-900 dark:text-gray-100">Drop files or folders to upload<div class="text-sm text-gray-500 dark:text-gray-400">or click to select</div></div></div>',
      previewsContainer: '#upload-zone',
      dictFallbackMessage: 'Your browser does not support drag\'n\'drop file uploads.',
      dictFallbackText: 'Please use the fallback form below to upload your files like in the olden days.',
      dictInvalidFileType: 'You can\'t upload files of this type.',
      dictRemoveFileConfirmation: 'Are you sure you want to remove this file?',
      dictFileSizeUnits: {
        kb: 'KB',
        mb: 'MB',
        gb: 'GB',
        tb: 'TB',
      },
      
      dictFileTooBig: 'File is too big ({{filesize}}MB). Max filesize: {{maxFilesize}}MB',
      dictResponseError: 'Server responded with {{statusCode}} code',
      dictCancelUpload: 'Cancel upload',
      dictCancelUploadConfirmation: 'Are you sure you want to cancel this upload?',
      // dictRemoveFile: '<svg  viewBox="0 0 54 54"fill="currentColor" xmlns="http://www.w3.org/2000/svg"><path d="M26.2929 20.2929L19.2071 13.2071C18.8166 12.8166 18.1834 12.8166 17.7929 13.2071L13.2071 17.7929C12.8166 18.1834 12.8166 18.8166 13.2071 19.2071L20.2929 26.2929C20.6834 26.6834 20.6834 27.3166 20.2929 27.7071L13.2071 34.7929C12.8166 35.1834 12.8166 35.8166 13.2071 36.2071L17.7929 40.7929C18.1834 41.1834 18.8166 41.1834 19.2071 40.7929L26.2929 33.7071C26.6834 33.3166 27.3166 33.3166 27.7071 33.7071L34.7929 40.7929C35.1834 41.1834 35.8166 41.1834 36.2071 40.7929L40.7929 36.2071C41.1834 35.8166 41.1834 35.1834 40.7929 34.7929L33.7071 27.7071C33.3166 27.3166 33.3166 26.6834 33.7071 26.2929L40.7929 19.2071C41.1834 18.8166 41.1834 18.1834 40.7929 17.7929L36.2071 13.2071C35.8166 12.8166 35.1834 12.8166 34.7929 13.2071L27.7071 20.2929C27.3166 20.6834 26.6834 20.6834 26.2929 20.2929Z"/></svg>',
      dictRemoveFile: 'Remove File',
      dictMaxFilesExceeded: 'You can only upload {{maxFiles}} files at a time',
    });

    // Add support for folder uploads by capturing the full path
    dropzone.on('addedfile', (file: DropzoneFile) => {
      const fileWithPath = file as DropzoneFileWithPath;
      const fullPath = fileWithPath.fullPath || file.name;
      console.log("A file has been added", file.name, fullPath);
      
      // Create a File object with the path information
      const fileWithMeta = new File([file], file.name, {
        type: file.type,
        lastModified: file.lastModified || Date.now()
      });
      
      // Add path information to the file object
      Object.defineProperty(fileWithMeta, 'fullPath', {
        value: fullPath,
        writable: true,
        configurable: true,
        enumerable: true
      });
      
      handleFiles([fileWithMeta]);
    });

    dropzone.on('sending', (file: DropzoneFile, xhr: XMLHttpRequest, formData: FormData) => {
      const fileWithPath = file as DropzoneFileWithPath;
      const fullPath = fileWithPath.fullPath || file.name;
      
      // Add the path information to formData with the correct key
      formData.append('relativePath', fullPath);
      formData.append('file', file);
      
      // Set up progress tracking
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = Math.round((event.loaded / event.total) * 100);
          setState(prev => ({
            ...prev,
            progress: percentComplete,
          }));
        }
      });
      
      // Handle response
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status >= 200 && xhr.status < 300) {
            console.log('Upload successful:', xhr.responseText);
          } else {
            const error = xhr.responseText ? JSON.parse(xhr.responseText).error : 'Upload failed';
            setState(prev => ({ ...prev, error }));
            dropzone.removeFile(file);
          }
        }
      };
      
      setState((prev: FileUploadState) => ({
        ...prev,
        isUploading: true,
        progress: 0,
      }));
      
      console.log("Sending file with path:", fullPath);
    });

    // Handle drag events for visual feedback
    dropzone.on('dragenter', () => {
      document.getElementById('upload-zone')?.classList.add('dz-drag-hover');
    });
    dropzone.on('dragleave', () => {
      document.getElementById('upload-zone')?.classList.remove('dz-drag-hover');
    });
    dropzone.on('drop', () => {
      document.getElementById('upload-zone')?.classList.remove('dz-drag-hover');
    });
    
    // dropzone.on('sending', (_: unknown, file: DropzoneFile) => {
    //   // This event is triggered when the file is being sent to the server
    //   // You can set the uploading state here
    //   setState((prev: FileUploadState) => ({
    //     ...prev,
    //     isUploading: true,
    //     progress: 0,
    //   }));
    //   // if file is actually a folder
    //   // if(file.fullPath){
    //   //     data.append("fullPath", file.fullPath);
    //   // }
    //   console.log("A file is being sent");

    // });
    dropzone.on('uploadprogress', (_: unknown, progress: number) => {
      setState((prev: FileUploadState) => ({
        ...prev,
        progress: Math.round(progress),
      }));
      console.log(`Upload progress: ${progress}%`);
    });
    dropzone.on('success', (_: unknown, file: DropzoneFile) => {
      setState((prev: FileUploadState) => ({
        ...prev,
        files: prev.files.filter((f: File) => f.name !== file.name),
        isUploading: false,
        progress: 0,
      }));
      console.log(`Upload successful: ${file.name}`);
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    dropzone.on('complete', (_: unknown, file: DropzoneFile) => {
      setState((prev: FileUploadState) => ({
        ...prev,
        isUploading: false,
        progress: 0,
      }));
      // dropzone.removeFile(file);
      console.log("A file has been completed");
    });
    dropzone.on('error', (file: DropzoneFile, message: string | Error) => {
      console.error('Upload error:', message);
      const errorMessage = typeof message === 'string' ? message : message.message;
      setState((prev: FileUploadState) => ({ 
        ...prev, 
        error: errorMessage,
        isUploading: false,
        progress: 0
      }));
      dropzone.removeFile(file);
    });

    return () => {
      dropzone.destroy();
    };
  }, []);

  return (
    <div className={`w-full  ${className}`} {...props}>
      <Card
        id="upload-zone"
        className="dropzone !min-h-[100vh] !max-h-[100vh]"
      >
        {/* <AnimatePresence>
          {files.length === 0 && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col items-center gap-4"
            >
              The message is handled by Dropzone
              
            </motion.div>
          )}
        </AnimatePresence> */}

        {/* <AnimatePresence>
          {files.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 w-full"
            >
              {files.map((file, index) => (
                <motion.div
                  key={file.name + index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="relative aspect-square bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden group"
                >
                  <div className="relative w-full h-full">
                    <div className="w-full h-full">
                      {file.type.startsWith('image/') ? (
                        <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-700">
                          <Image
                            src={URL.createObjectURL(file)}
                            alt={file.name}
                            fill
                            className="object-cover rounded-lg"
                          />
                        </div>
                      ) : (
                        <div className="w-full h-full rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                          </svg>
                        </div>
                      )}
                    </div>
                    <div className="absolute hidden group-hover:block h-full  inset-0 p-3 bg-gradient-to-t from-black/50 to-gray-900/40 backdrop-blur-sm  text-white">
                      <div className="w-full h-full flex flex-col items-start justify-center">
                        <p className="text-sm font-medium truncate">
                          {file.name}
                        </p>
                        <p className="text-xs opacity-75 text-center w-full">
                          {(file.size / 1024 / 1024).toFixed(2)} MB
                        </p>
                      </div>
                    </div>
                    <button
                      onClick={() => removeFile(index)}
                      className="absolute top-2 right-2 z-10 w-8 h-8 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      type="button"
                      aria-label={`Remove ${file.name}`}
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
                              {Math.round(progress)}%
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
        </AnimatePresence> */}

        {/* {isUploading && (
          <div className="mt-4">
            <div className="h-2 bg-gray-200 rounded-full">
              <div
                className="h-2 bg-blue-500 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )} */}
      </Card>

      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="p-4 text-red-700 bg-red-100 dark:bg-red-900/20 dark:text-red-400 rounded-lg"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>
      
    
    </div>

  );
});

FileUpload.displayName = 'FileUpload';

export default FileUpload;
