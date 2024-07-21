import { useState } from 'react';
import { Button } from 'src/shared/ui/Button/Button';
import { ArrowLeft } from 'src/shared/ui/icons';
import styles from 'src/pages/form/my_profile/MyProfilePage.module.css';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';

const Steps = Object.values(MyProfileStepMeta);

export const MyProfilePage = ({ onClickNextStep }: { onClickNextStep: () => void }) => {
  const [currentStepIdx, setCurrentStep] = useState(0);
  const name = useProfileFirstName();

  const currentStep = Steps[currentStepIdx];
  const canGoNext = useMyProfileStore(currentStep.canGoNext);

  const handleClickNext = () => {
    if (currentStepIdx < Steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClickNextStep();
    }
  };

  return (
    <div className={styles.Container}>
      <header className={styles.Header}>
        <div className={styles.HeaderBar}>
          {currentStepIdx > 0 && (
            <ArrowLeft type={'button'} onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))} />
          )}
          <span>
            {currentStepIdx + 1}/{Steps.length}
          </span>
        </div>
        <h2>{currentStep.title({ name })}</h2>
        {currentStep.description && <small className={styles.Description}>{currentStep.description()}</small>}
      </header>
      <main className={styles.Main}>{currentStep.form}</main>
      <footer className={styles.Footer}>
        <Button variant={'filled'} widthType={'fill'} color={'primary'} disabled={!canGoNext} onClick={handleClickNext}>
          다음
        </Button>
      </footer>
    </div>
  );
};
