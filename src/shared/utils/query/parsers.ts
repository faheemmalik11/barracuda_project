import { parseDateFromQuery } from "@shared/utils/date"
import { toDollars } from "@shared/utils/amountFilterUtils"
import type { AmountFilterValue } from '@shared/types/amountFilter'
import type { DateFilterValue } from '@shared/types/dateFilter'

/**
 * Parse "last_Xd", "last_Xh", "last_Xm" format into DateFilterValue
 */
export function parseLastXFormat(value: string): DateFilterValue | null {
  const match = value.match(/^last_(\d+)([hdm])$/);
  if (match) {
    return {
      operator: 'last',
      lastNumber: parseInt(match[1], 10),
      lastUnit: match[2] as 'h' | 'd' | 'm'
    };
  }
  return null;
}

/**
 * Parse a date value into DateFilterValue with equal operator
 */
export function parseDateEqual(value: string): DateFilterValue {
  const date = parseDateFromQuery(value);
  return { 
    operator: 'equal',
    value: date 
  };
}

/**
 * Parse date range from format "fromDate<date<toDate"
 */
export function parseDateRange(part: string): DateFilterValue | null {
  if (part.includes('<date<')) {
    const [fromStr, toStr] = part.split('<date<');
    return { 
      operator: 'between',
      startDate: parseDateFromQuery(fromStr), 
      endDate: parseDateFromQuery(toStr) 
    };
  }
  return null;
}

/**
 * Parse date comparison operators (date>, date<)
 */
export function parseDateComparison(part: string): DateFilterValue | null {
  if (part.startsWith('date>')) {
    return { 
      operator: 'after',
      value: parseDateFromQuery(part.substring(5)) 
    };
  } else if (part.startsWith('date<')) {
    return { 
      operator: 'before',
      value: parseDateFromQuery(part.substring(5)) 
    };
  }
  return null;
}

/**
 * Parse amount with equal operator
 */
export function parseAmountEqual(value: string): AmountFilterValue {
  return { 
    operator: 'equal', 
    value: toDollars(value).toString()
  } as AmountFilterValue;
}

/**
 * Parse amount comparison operators for a given field (amount>, amount<, field>, field<)
 */
export function parseAmountComparison(part: string, fieldName: string): AmountFilterValue | null {
  const greaterPrefix = `${fieldName}>`;
  const lessPrefix = `${fieldName}<`;
  
  if (part.startsWith(greaterPrefix)) {
    return { 
      operator: 'greater_than', 
      value: toDollars(part.substring(greaterPrefix.length)).toString()
    } as AmountFilterValue;
  } else if (part.startsWith(lessPrefix)) {
    return { 
      operator: 'less_than', 
      value: toDollars(part.substring(lessPrefix.length)).toString()
    } as AmountFilterValue;
  }
  return null;
}

/**
 * Parse amount range from format "min<field<max"
 */
export function parseAmountRange(part: string, fieldName: string): AmountFilterValue | null {
  const rangePattern = `<${fieldName}<`;
  if (part.includes(rangePattern)) {
    const [min, max] = part.split(rangePattern);
    return {
      operator: 'range',
      min: toDollars(min).toString(),
      max: toDollars(max).toString()
    } as AmountFilterValue;
  }
  return null;
}

/**
 * Parse array field from semicolon-separated values
 */
export function parseArrayField(value: string): string[] {
  return value.split(';');
}

/**
 * Parse boolean field from string
 */
export function parseBooleanField(value: string): boolean {
  return value === 'true';
}

/**
 * Parse search parameter with URL decoding
 */
export function parseSearchParam(value: string): string {
  return decodeURIComponent(value);
}

/**
 * Extract and parse comparison operators from query parts
 * Handles both date and amount fields with their respective operators
 */
export function parseComparisonPart(
  part: string, 
  dateHandler: (dateFilter: DateFilterValue) => void,
  amountHandlers: Array<{
    fieldName: string;
    handler: (amountFilter: AmountFilterValue) => void;
  }>
): boolean {
  // Try date comparisons first
  const dateComparison = parseDateComparison(part);
  if (dateComparison) {
    dateHandler(dateComparison);
    return true;
  }

  const dateRange = parseDateRange(part);
  if (dateRange) {
    dateHandler(dateRange);
    return true;
  }

  // Try amount comparisons for each registered field
  for (const { fieldName, handler } of amountHandlers) {
    const amountComparison = parseAmountComparison(part, fieldName);
    if (amountComparison) {
      handler(amountComparison);
      return true;
    }

    const amountRange = parseAmountRange(part, fieldName);
    if (amountRange) {
      handler(amountRange);
      return true;
    }
  }

  return false;
}