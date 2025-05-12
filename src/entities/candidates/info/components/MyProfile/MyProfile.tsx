import { Accordion } from 'src/shared/ui/Accordion/Accordion';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { PersonalInfoGrid } from 'src/entities/candidates/info/components/MyProfile/components/PersonalInfoGrid';
import { TasteInfoGrid } from 'src/entities/candidates/info/components/MyProfile/components/TasteInfoGrid';
import { QuestionInfoGrid } from 'src/entities/candidates/info/components/MyProfile/components/QuestionInfoGrid';
import { useProfileEditContext } from 'src/entities/candidates/_common/components/EditInfo/ProfileEditContext';
import { MyProfile } from 'src/entities/candidates/info/models/myProfileStore';

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
