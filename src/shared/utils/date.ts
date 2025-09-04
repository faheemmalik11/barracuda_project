/**
 * Format a date object to YYYYMMDD format for API queries
 * 
 * @param date - Date object or ISO string to format
 * @returns Formatted date string in YYYYMMDD format
 * @throws Error if date is invalid
 */
export const formatDateForQuery = (date: Date | string): string => {
  if (!date) {
    throw new Error('Date is required for formatting');
  }
  
  const d = date instanceof Date ? date : new Date(date);
  
  if (isNaN(d.getTime())) {
    throw new Error('Invalid date provided for formatting');
  }
  
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, '0');
  const day = String(d.getDate()).padStart(2, '0');
  
  return `${year}${month}${day}`;
}

/**
 * Parse a date string in YYYYMMDD format to a Date object
 * 
 * @param dateStr - Date string in YYYYMMDD format
 * @returns Date object
 * @throws Error if dateStr is invalid format
 */
export const parseDateFromQuery = (dateStr: string): Date => {
  if (typeof dateStr !== 'string' || dateStr.length !== 8) {
    throw new Error('Date string must be in YYYYMMDD format');
  }
  
  const year = dateStr.substring(0, 4);
  const month = dateStr.substring(4, 6);
  const day = dateStr.substring(6, 8);
  
  // Validate numeric values
  const yearNum = parseInt(year, 10);
  const monthNum = parseInt(month, 10);
  const dayNum = parseInt(day, 10);
  
  if (isNaN(yearNum) || isNaN(monthNum) || isNaN(dayNum) || 
      monthNum < 1 || monthNum > 12 || dayNum < 1 || dayNum > 31) {
    throw new Error('Invalid date values in YYYYMMDD string');
  }
  
  const date = new Date(`${year}-${month}-${day}`);
  
  // Validate that the date was created successfully
  if (isNaN(date.getTime())) {
    throw new Error('Invalid date created from YYYYMMDD string');
  }
  
  return date;
}


/**
 * Get a relative date based on a preset
 * 
 * @param preset - Relative date preset (e.g., 'today', 'yesterday', 'last_7d')
 * @returns Date object
 */
export const getRelativeDate = (preset: string): Date | null => {
  const now = new Date();
  
  switch (preset) {
    case 'today':
      return now;
    
    case 'yesterday': {
      const yesterday = new Date(now);
      yesterday.setDate(now.getDate() - 1);
      return yesterday;
    }
    
    case 'this_month': {
      const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
      return firstDay;
    }
    
    default:
      if (preset.startsWith('last_')) {
        const value = parseInt(preset.substring(5, preset.length - 1), 10);
        const unit = preset.charAt(preset.length - 1);
        
        const result = new Date(now);
        
        switch (unit) {
          case 'h': // hours
            result.setHours(now.getHours() - value);
            break;
          case 'd': // days
            result.setDate(now.getDate() - value);
            break;
          case 'm': // months
            result.setMonth(now.getMonth() - value);
            break;
          default:
            return null;
        }
        
        return result;
      }
      
      return null;
  }
}
