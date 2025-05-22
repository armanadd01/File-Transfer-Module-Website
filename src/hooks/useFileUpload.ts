"use client";
import { useState, useCallback } from 'react';
import { validateFileType, MAX_FILE_SIZE, ALLOWED_FILE_TYPES } from '@/lib/fileUtils';

interface UseFileUploadOptions {
  maxSize?: number;
  allowedTypes?: string[];
}

interface FileUploadState {
  files: File[];
  isUploading: boolean;
  progress: number;
  error: string | null;
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const { 
    maxSize = MAX_FILE_SIZE,
    allowedTypes = ALLOWED_FILE_TYPES 
  } = options;

  const [state, setState] = useState<FileUploadState>({
    files: [],
    isUploading: false,
    progress: 0,
    error: null,
  });

  const validateFile = useCallback((file: File): string | null => {
    if (file.size > maxSize) {
      return `File size exceeds ${maxSize / (1024 * 1024 * 1024)}GB limit`;
    }

    if (!validateFileType(file, allowedTypes)) {
      return `File type ${file.type || 'unknown'} not supported`;
    }

    return null;
  }, [maxSize, allowedTypes]);

  const handleFiles = useCallback((newFiles: FileList | File[]) => {
    const fileArray = Array.from(newFiles);
    const errors: string[] = [];
    const validFiles: File[] = [];

    fileArray.forEach(file => {
      const error = validateFile(file);
      if (error) {
        errors.push(`${file.name}: ${error}`);
      } else {
        validFiles.push(file);
      }
    });

    if (errors.length > 0) {
      setState(prev => ({
        ...prev,
        error: errors.join('\n'),
      }));
      if (validFiles.length === 0) return;
    }

    setState(prev => ({
      ...prev,
      files: [...prev.files, ...validFiles],
      error: errors.length > 0 ? `Some files were not added:\n${errors.join('\n')}` : null,
    }));
  }, [validateFile]);

  const uploadFiles = useCallback(async () => {
    if (state.files.length === 0) return;

    setState(prev => ({ ...prev, isUploading: true, progress: 0 }));

    try {
      // Simulate upload progress
      for (let i = 0; i <= 100; i += 10) {
        await new Promise(resolve => setTimeout(resolve, 200));
        setState(prev => ({ ...prev, progress: i }));
      }

      setState(prev => ({
        ...prev,
        isUploading: false,
        progress: 100,
        files: [],
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isUploading: false,
        error: error instanceof Error ? error.message : 'Upload failed',
      }));
    }
  }, [state.files]);

  const clearFiles = useCallback(() => {
    setState(prev => ({
      ...prev,
      files: [],
      error: null,
    }));
  }, []);

  return {
    ...state,
    handleFiles,
    uploadFiles,
    clearFiles,
  };
}
