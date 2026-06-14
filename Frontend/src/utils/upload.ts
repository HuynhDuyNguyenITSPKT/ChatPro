export const validateFile = (
  file: File,
  allowedTypes: string[] = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
  maxSizeMb: number = 5
): { isValid: boolean; error?: string } => {
  if (!allowedTypes.includes(file.type)) {
    return {
      isValid: false,
      error: `File type ${file.type} is not supported. Allowed: ${allowedTypes.join(', ')}`,
    };
  }

  const maxSizeBytes = maxSizeMb * 1024 * 1024;
  if (file.size > maxSizeBytes) {
    return {
      isValid: false,
      error: `File size exceeds the limit of ${maxSizeMb}MB.`,
    };
  }

  return { isValid: true };
};

export const getBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });
};
