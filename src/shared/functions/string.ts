export const getRangeText = (range?: { min?: number; max?: number }, util?: string) => {
  if (!range || (!range.min && !range.max)) return '상관 없어요';
  if (!range.min) return `최대 ${range.max}${util}`;
  if (!range.max) return `최소 ${range.min}${util}`;
  return `${range.min}${util} - ${range.max}${util}`;
};
