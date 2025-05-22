import { useState, useCallback } from 'react';
import { validateFileType, MAX_FILE_SIZE, ALLOWED_FILE_TYPES, generateFilePreview } from '../lib/fileUtils';

interface FileWithPreview {
  file: File;
  preview?: string;
}

export const useFiles = () => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  const [error, setError] = useState<string | null>(null);

  const addFiles = useCallback(async (newFiles: FileList | null) => {
    if (!newFiles) return;

    setError(null);
    const fileArray = Array.from(newFiles);
    
    // Validate files
    for (const file of fileArray) {
      if (!validateFileType(file, ALLOWED_FILE_TYPES)) {
        setError('Invalid file type');
        return;
      }
      if (file.size > MAX_FILE_SIZE) {
        setError('File too large (max 2GB)');
        return;
      }
    }

    // Generate previews for image files
    const filesWithPreviews = await Promise.all(
      fileArray.map(async (file) => ({
        file,
        preview: await generateFilePreview(file)
      }))
    );

    setFiles(prev => [...prev, ...filesWithPreviews]);
  }, []);

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setError(null);
  }, []);

  return {
    files: files.map(f => f.file),
    filePreviews: files,
    error,
    addFiles,
    removeFile,
    clearFiles
  };
};