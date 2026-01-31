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
        title={'작성 중인 후보자 정보가 있습니다.'}
        description={`이어서 정보를 작성할까요?\n취소할 경우 기존 정보는 사라져요.`}
        confirmText={'이어쓰기'}
        cancelText={'취소'}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onClose={handleCancel}
      />
    </>
  );
};
