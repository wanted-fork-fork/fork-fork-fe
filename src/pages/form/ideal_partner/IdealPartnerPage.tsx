import { useCallback, useEffect, useState } from 'react';
import styles from './IdealPartnerPage.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';
import { useIdealPartnerFormProcessStore } from 'src/entities/candidates/ideal_partner/processes/_store/idealPartnerFormProcessStore';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import {
  IdealPartner,
  useIdealPartnerStore,
} from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { useProfileFirstName } from 'src/entities/candidates/info/utils/useProfileFirstName';

const Steps = Object.values(IdealPartnerStepMeta) as StepMeta<IdealPartner>[];
const StepKeys = Object.keys(IdealPartnerStepMeta) as (keyof typeof IdealPartnerStepMeta)[];
export const IdealPartnerPage = ({ onClickNextStep }: { onClickNextStep: () => void }) => {
  const [currentStepIdx, setCurrentStep] = useState(0);
  const name = useProfileFirstName();

  const touchedSteps = useIdealPartnerFormProcessStore((state) => state.touchedSteps);
  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);

  const currentStep = Steps[currentStepIdx];
  const canGoNext = useIdealPartnerStore((state) =>
    currentStep.canGoNext(state, (key) => touchedSteps.has(key as keyof typeof IdealPartnerStepMeta)),
  );

  useEffect(() => {
    if (currentStepIdx > 0) {
      addTouchedStep(StepKeys[currentStepIdx - 1]);
    }
    if (currentStepIdx === StepKeys.length - 1) {
      addTouchedStep(StepKeys[currentStepIdx]);
    }
  }, [addTouchedStep, currentStepIdx]);

  const handleClickNext = () => {
    if (currentStepIdx < Steps.length - 1) {
      setCurrentStep((prev) => prev + 1);
    } else {
      onClickNextStep();
    }
  };

  const handleClickPrev = useCallback(() => {
    setCurrentStep((prev) => Math.max(0, prev - 1));
  }, []);

  return (
    <div className={styles.Container}>
      <Header
        className={styles.InnerHeader}
        onPrev={currentStepIdx > 0 ? handleClickPrev : undefined}
        suffixSlot={
          <span className={styles.FormCount}>
            {currentStepIdx + 1}/{Steps.length}
          </span>
        }
      />
      <Spacing size={15} />
      <div className={styles.TitleSection}>
        <h2>{currentStep.title({ name })}</h2>
        {currentStep.description && <small className={styles.Description}>{currentStep.description()}</small>}
      </div>
      <main className={styles.Main}>{currentStep.form({})}</main>
      <footer className={styles.Footer}>
        <Button variant={'filled'} widthType={'fill'} color={'primary'} disabled={!canGoNext} onClick={handleClickNext}>
          다음
        </Button>
      </footer>
    </div>
  );
};
