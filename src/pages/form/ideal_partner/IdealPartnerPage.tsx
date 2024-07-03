import { useState } from 'react';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import styles from './IdealPartnerPage.module.css';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Button } from 'src/shared/ui/Button/Button';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';
import { useIdlePartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';

const Steps = Object.values(IdealPartnerStepMeta);
export const IdealPartnerPage = () => {
  const [currentStepIdx, setCurrentStep] = useState(0);
  const name = useProfileFirstName();

  const currentStep = Steps[currentStepIdx];
  const canGoNext = useIdlePartnerStore(currentStep.canGoNext);

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
