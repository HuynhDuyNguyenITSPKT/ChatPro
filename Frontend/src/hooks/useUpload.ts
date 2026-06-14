import { useState } from 'react';
import { uploadService } from '@/services/upload.service';
import { validateFile } from '@/utils/upload';

export const useUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(null);

  const upload = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    setError(null);

    const validation = validateFile(file);
    if (!validation.isValid) {
      setError(validation.error || 'Invalid file');
      setIsUploading(false);
      return null;
    }

    try {
      const result = await uploadService.uploadFile(file);
      setUploadedUrl(result.url);
      setIsUploading(false);
      return result.url;
    } catch (err: any) {
      const errMsg = err?.response?.data?.message || err?.message || 'Failed to upload file';
      setError(errMsg);
      setIsUploading(false);
      return null;
    }
  };

  const reset = () => {
    setError(null);
    setUploadedUrl(null);
    setIsUploading(false);
  };

  return {
    upload,
    reset,
    isUploading,
    error,
    uploadedUrl,
  };
};
