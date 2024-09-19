import { useCallback, useEffect, useState } from 'react';
import { Button } from 'src/shared/ui/Button/Button';
import styles from 'src/pages/form/my_profile/MyProfilePage.module.css';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';
import { useMyProfileFormProcessStore } from 'src/processes/my_profile/_store/myProfileFormProcessStore';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';

const Steps = Object.values(MyProfileStepMeta);
const StepKeys = Object.keys(MyProfileStepMeta);

export const MyProfilePage = ({ onClickNextStep }: { onClickNextStep: () => void }) => {
  const [currentStepIdx, setCurrentStep] = useState(0);
  const name = useProfileFirstName();

  const currentStep = Steps[currentStepIdx];
  const canGoNext = useMyProfileStore(currentStep.canGoNext);

  const addTouchedStep = useMyProfileFormProcessStore((state) => state.addTouchedStep);

  useEffect(() => {
    addTouchedStep(StepKeys[currentStepIdx]);
  }, [addTouchedStep, currentStepIdx]);

  const handleClickNext = useCallback(() => {
    if (currentStepIdx < Steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClickNextStep();
    }
  }, [currentStepIdx, onClickNextStep]);

  const handleClickPrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  return (
    <div className={styles.Container}>
      <Header
        onPrev={currentStepIdx > 0 ? handleClickPrev : undefined}
        suffixSlot={
          <span className={styles.FormCount}>
            {currentStepIdx + 1}/{Steps.length}
          </span>
        }
      />
      <Spacing size={15} />
      {(currentStep.showTitle ?? true) && (
        <div className={styles.TitleSection}>
          <h2>{currentStep.title({ name })}</h2>
          {currentStep.description && <small className={styles.Description}>{currentStep.description()}</small>}
        </div>
      )}
      <div className={styles.Main}>{currentStep.form({ onClickNextForm: handleClickNext })}</div>
      {(currentStep.showNextButton ?? true) && (
        <div className={styles.Footer}>
          <Button
            variant={'filled'}
            widthType={'fill'}
            color={'primary'}
            disabled={!canGoNext}
            onClick={handleClickNext}
          >
            다음
          </Button>
        </div>
      )}
    </div>
  );
};
