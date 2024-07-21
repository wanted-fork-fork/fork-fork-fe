import { ProfileFormIntroPage } from 'src/pages/form/intro/ProfileFormIntroPage';
import { useState } from 'react';
import { SwitchCase } from 'src/shared/ui/SwitchCase';
import { MyProfilePage } from 'src/pages/form/my_profile/MyProfilePage';
import { IdealPartnerIntroPage } from 'src/pages/form/intro/IdealPartnerIntroPage';
import { IdealPartnerPage } from 'src/pages/form/ideal_partner/IdealPartnerPage';
import { FormConfirmPage } from 'src/pages/form/confirm/FormConfirmPage';
import { UploadLoadingPage } from 'src/pages/form/complete/UploadLoadingPage';
import { CompletePage } from 'src/pages/form/complete/CompletePage';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { Shortcut } from 'src/processes/shortcut/Shortcut';
import styles from 'src/app/styles/form.module.css';

const MAX_STEP_COUNT = 7;

export default function ProfileFormPage() {
  const [step, setStep] = useState(0);

  const increase = () => setStep((prev) => (prev + 1 < MAX_STEP_COUNT ? prev + 1 : prev));

  const name = useProfileFirstName();

  const showShortcut = [1, 3, 4].includes(step);

  return (
    <div className={styles.Wrapper}>
      <SwitchCase
        value={step}
        caseBy={{
          0: <ProfileFormIntroPage onClickNextStep={increase} />,
          1: <MyProfilePage onClickNextStep={increase} />,
          2: <IdealPartnerIntroPage name={name} onClickNextStep={increase} />,
          3: <IdealPartnerPage onClickNextStep={increase} />,
          4: <FormConfirmPage onClickNextStep={increase} />,
          5: <UploadLoadingPage name={name} onComplete={increase} />,
          6: <CompletePage />,
        }}
      />
      {showShortcut && <Shortcut right={'20px'} bottom={'100px'} />}
    </div>
  );
}
