import { useBoolean } from 'src/shared/functions/useBoolean';
import { useFormTempSave } from 'src/entities/candidates/_common/hooks/useFormTempSave';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';
import { useEffect } from 'react';

export const FormTempSave = ({
  linkKey,
  step,
  lastStep,
  setStep,
}: {
  linkKey: string;
  step: number;
  lastStep: number;
  setStep: (step: number) => void;
}) => {
  const { value: show, setTrue: open, setFalse: close } = useBoolean();

  const { handleOverride, handleReset } = useFormTempSave({ key: linkKey, step, setStep, onSaveDetected: open });

  const handleConfirm = () => {
    handleOverride();
    close();
  };

  const handleCancel = () => {
    handleReset();
    close();
  };

  useEffect(() => {
    if (step === lastStep) {
      handleReset();
    }
  }, [handleReset, lastStep, step]);

  return (
    <>
      <ConfirmModal
        show={show}
        title={'작성하던 정보가 있어요. 덮어씌울까요?'}
        confirmText={'확인'}
        cancelText={'취소'}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={handleCancel}
      />
    </>
  );
};
