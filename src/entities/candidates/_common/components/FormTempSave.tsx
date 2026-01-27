import { useBoolean } from 'src/shared/functions/useBoolean';
import { useFormTempSave } from 'src/entities/candidates/_common/hooks/useFormTempSave';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';

export const FormTempSave = ({
  linkKey,
  step,
  setStep,
}: {
  linkKey: string;
  step: number;
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
