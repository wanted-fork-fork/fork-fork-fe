import { useCallback, useEffect, useState } from 'react';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import styles from './IdealPartnerPage.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';
import { IdealPartner, useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { useIdealPartnerFormProcessStore } from 'src/processes/ideal_partner/_store/idealPartnerFormProcessStore';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { StepMeta } from 'src/shared/types/FormStepMeta';

const Steps = Object.values(IdealPartnerStepMeta) as StepMeta<IdealPartner>[];
const StepKeys = Object.keys(IdealPartnerStepMeta) as (keyof typeof IdealPartnerStepMeta)[];
export const IdealPartnerPage = ({ onClickNextStep }: { onClickNextStep: () => void }) => {
  const [currentStepIdx, setCurrentStep] = useState(0);
  const name = useProfileFirstName();

  const currentStep = Steps[currentStepIdx];
  const canGoNext = useIdealPartnerStore(currentStep.canGoNext);

  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);

  useEffect(() => {
    addTouchedStep(StepKeys[currentStepIdx]);
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
