export const capitalizeFirstLetter = (string: string): string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const formatLimit = (limit?: number): string => 
  limit && limit > 100 ? "No Limit" : limit?.toString() || "Not specified";

export const formatValue = (value?: string | number): string => 
  value !== undefined && value !== null && value !== "Unknown" ? value.toString() : "Unknown";

export const copyToClipboard = async (text: string, toast: any): Promise<void> => {
  try {
    await navigator.clipboard.writeText('connect ' + text);
    toast.success('Server IP copied to clipboard!');
  } catch (err) {
    toast.error('Failed to copy server IP to clipboard!');
  }
};
