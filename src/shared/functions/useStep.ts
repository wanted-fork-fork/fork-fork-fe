import { useCallback, useState } from 'react';

export const useStep = ({ max, initialValue = 0 }: { max: number; initialValue?: number }) => {
  const [step, _setStep] = useState(initialValue);

  const increase = useCallback(() => _setStep((prev) => Math.min(max, prev + 1)), [max]);
  const decrease = useCallback(() => _setStep((prev) => Math.max(0, prev - 1)), []);
  const setStep = useCallback((step: number) => _setStep(Math.min(Math.max(step, 0), max)), [max]);

  return { step, increase, decrease, setStep };
};
