export function calculateGlobalIndex(
  page: number,
  itemIndex: number,
  pageSize: number
): number {
  return (page - 1) * pageSize + itemIndex;
}

export function calculatePageFromIndex(
  globalIndex: number,
  pageSize: number
): number {
  return Math.floor(globalIndex / pageSize) + 1;
}

export function getItemIndexInPage(
  globalIndex: number,
  pageSize: number
): number {
  return globalIndex % pageSize;
}

export function canNavigateNext(
  currentIndex: number,
  totalItems: number
): boolean {
  return currentIndex < totalItems - 1;
}

export function canNavigatePrevious(currentIndex: number): boolean {
  return currentIndex > 0;
}

export function calculateTotalPages(totalItems: number, pageSize: number): number {
  return Math.ceil(totalItems / pageSize);
}

export function normalizePageNumber(page: number, totalPages: number): number {
  return Math.max(1, Math.min(page, totalPages));
}

export function isValidIndex(index: number, totalItems: number): boolean {
  return index >= 0 && index < totalItems;
}