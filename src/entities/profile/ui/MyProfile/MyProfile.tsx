import { Accordion } from 'src/shared/ui/Accordion/Accordion';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { MyProfile } from 'src/entities/profile/model/myProfileStore';
import { PersonalInfoGrid } from './components/PersonalInfoGrid';
import { TasteInfoGrid } from './components/TasteInfoGrid';
import { QuestionInfoGrid } from 'src/entities/profile/ui/MyProfile/components/QuestionInfoGrid';
import { useProfileEditContext } from 'src/features/EditInfo/ProfileEditContext';

export const MyProfileView = ({ profile, initialOpen = false }: { profile: MyProfile; initialOpen?: boolean }) => {
  const value = useProfileEditContext();
  const onEdit = value.canEdit ? value.onEdit : undefined;

  return (
    <section>
      <Accordion summary={'기본 개인정보'} initialOpen={initialOpen}>
        <Spacing size={32} />
        <PersonalInfoGrid profile={profile} onClickEdit={onEdit} />
      </Accordion>
      <Spacing size={32} />
      <Accordion summary={'개인 취향 및 선호도 관련'} initialOpen={initialOpen}>
        <Spacing size={32} />
        <TasteInfoGrid profile={profile} onClickEdit={onEdit} />
      </Accordion>
      <Spacing size={32} />
      <Accordion summary={'선택 질문'} initialOpen={initialOpen}>
        <Spacing size={32} />
        <QuestionInfoGrid profile={profile} onClickEdit={onEdit} />
      </Accordion>
    </section>
  );
};
