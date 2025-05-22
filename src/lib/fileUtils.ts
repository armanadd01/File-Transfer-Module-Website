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