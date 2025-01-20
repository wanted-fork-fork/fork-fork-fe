export const pickNonFunctionValues = (obj: object) => {
  return Object.fromEntries(Object.entries(obj).filter(([, value]) => typeof value !== 'function'));
};
