export const formatDate = (dateString: string | Date, options?: Intl.DateTimeFormatOptions): string => {
  if (!dateString) return '';
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return '';
  
  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };
  
  return new Intl.DateTimeFormat('en-US', defaultOptions).format(date);
};

export const formatTime = (dateString: string | Date): string => {
  return formatDate(dateString, {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  });
};
