import { useState } from 'react';
import { Button } from 'src/shared/ui/Button/Button';
import { ArrowLeft } from 'src/shared/ui/icons';
import styles from 'src/pages/form/my_profile/MyProfilePage.module.css';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';

const Steps = Object.values(MyProfileStepMeta);

export const MyProfilePage = () => {
  const [currentStepIdx, setCurrentStep] = useState(0);
  const name = useProfileFirstName();

  const currentStep = Steps[currentStepIdx];
  const canGoNext = useMyProfileStore(currentStep.canGoNext);

  return (
    <div className={styles.Container}>
      <header className={styles.Header}>
        <div className={styles.HeaderBar}>
          <ArrowLeft type={'button'} onClick={() => setCurrentStep((prev) => Math.max(0, prev - 1))} />
          <span>
            {currentStepIdx + 1}/{Steps.length}
          </span>
        </div>
        <h2>{currentStep.title({ name })}</h2>
        {currentStep.description && <small className={styles.Description}>{currentStep.description()}</small>}
      </header>
      <main className={styles.Main}>{currentStep.form}</main>
      <footer className={styles.Footer}>
        <Button
          variant={'filled'}
          widthType={'fill'}
          color={'primary'}
          disabled={!canGoNext}
          onClick={() => setCurrentStep((prev) => Math.min(prev + 1, Steps.length - 1))}
        >
          다음
        </Button>
      </footer>
    </div>
  );
};
