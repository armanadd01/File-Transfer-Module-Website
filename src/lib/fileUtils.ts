export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';

  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(2))} ${sizes[i]}`;
};

export const validateFileType = (file: File, allowedTypes: string[]): boolean => {
  return allowedTypes.includes(file.type);
};

export const generateFilePreview = async (file: File): Promise<string> => {
  if (file.type.startsWith('image/')) {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });
  }
  return '';
};

export const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB
export const ALLOWED_FILE_TYPES = [
  'image/*',
  'application/pdf',
  'application/zip',
  'application/x-zip-compressed',
  'application/octet-stream'
];

/**
 * Save a file to the local device
 * This function creates a download link and triggers it to save the file locally
 */
export const saveFileToDevice = (file: File, customFileName?: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Create a URL for the file
      const fileURL = URL.createObjectURL(file);
      
      // Create a download link
      const downloadLink = document.createElement('a');
      downloadLink.href = fileURL;
      downloadLink.download = customFileName || file.name;
      
      // Append to the document, click it, and remove it
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
      
      // Clean up the URL object
      setTimeout(() => {
        URL.revokeObjectURL(fileURL);
      }, 100);
      
      resolve(`File ${customFileName || file.name} saved successfully`);
    } catch (error) {
      reject(error instanceof Error ? error.message : 'Failed to save file');
    }
  });
};