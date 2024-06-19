import styles from './PersonalInfoForm.module.css';
import { HeightForm } from 'src/processes/my_profile/PersonalInfoForm/components/HeightForm';
import { BirthDateForm } from 'src/processes/my_profile/PersonalInfoForm/components/BirthDateForm';
import { GenderForm } from 'src/processes/my_profile/PersonalInfoForm/components/GenderForm';
import { NameForm } from 'src/processes/my_profile/PersonalInfoForm/components/NameForm';

/**
 * 내 프로필 입력 > 기본 인적사항
 */
export const PersonalInfoForm = () => {
  return (
    <section className={styles.Container}>
      <HeightForm />
      <BirthDateForm />
      <GenderForm />
      <NameForm />
    </section>
  );
};
