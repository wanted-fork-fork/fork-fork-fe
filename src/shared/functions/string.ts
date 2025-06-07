export const getRangeText = (
  range?: { min?: number; max?: number },
  {
    unit = '',
    singlePrefix = { min: '', max: '' },
    singlePostfix = { min: '', max: '' },
    infix = '-',
    suffix = '',
    empty = '',
  }: {
    unit?: string;
    singlePrefix?: { min: string; max: string };
    singlePostfix?: { min: string; max: string };
    infix?: string;
    suffix?: string;
    empty?: string;
  } = {
    unit: '',
    singlePrefix: { min: '', max: '' },
    singlePostfix: { min: '', max: '' },
    infix: '-',
    suffix: '',
    empty: '',
  },
) => {
  if (!range || (!range.min && !range.max)) return empty;
  if (!range.min) return [singlePrefix.max, `${range.max}${unit}`, singlePostfix.max].join(' ');
  if (!range.max) return [singlePrefix.min, `${range.min}${unit}`, singlePostfix.min].join(' ');
  return `${range.min}${unit} ${infix} ${range.max}${unit} ${suffix}`;
};
