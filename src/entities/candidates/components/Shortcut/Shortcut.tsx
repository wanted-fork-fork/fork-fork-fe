import { ArrowRight, List } from 'src/shared/ui/icons';
import { useRef, useState } from 'react';
import { Button } from 'src/shared/ui/Button/Button';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/_store/myProfileFormProcessStore';
import { useIdealPartnerFormProcessStore } from 'src/entities/candidates/ideal_partner/processes/_store/idealPartnerFormProcessStore';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import toast from 'react-hot-toast';
import { StepMeta } from 'src/shared/types/FormStepMeta';
import { ProfileEditBody } from 'src/entities/candidates/components/EditInfo/ProfileEditBody';
import { MyProfile } from 'src/entities/candidates/info/models/myProfileStore';
import { IdealPartner } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import styles from './Shortcut.module.css';

const ProfileMetaList = Array.from(Object.entries(MyProfileStepMeta)) as [
  keyof typeof MyProfileStepMeta,
  StepMeta<MyProfile>,
][];
const IdealPartnerMetaList = Array.from(Object.entries(IdealPartnerStepMeta)) as [
  keyof typeof IdealPartnerStepMeta,
  StepMeta<IdealPartner>,
][];

export const Shortcut = ({ right, bottom }: { right: `${number}px`; bottom: `${number}px` }) => {
  const floatingButtonPosition = useRef({ right, bottom });

  const myProfileTouchedSteps = useMyProfileFormProcessStore((state) => state.touchedSteps);
  const idealPartnerTouchedSteps = useIdealPartnerFormProcessStore((state) => state.touchedSteps);

  const [open, setOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<
    | {
        section: 'PROFILE';
        key: keyof typeof MyProfileStepMeta;
      }
    | {
        section: 'IDEAL_PARTNER';
        key: keyof typeof IdealPartnerStepMeta;
      }
    | null
  >(null);

  const onClose = () => {
    setOpen(false);
    setSelectedKey(null);
  };

  const selectedStep =
    selectedKey &&
    ((selectedKey.section === 'PROFILE'
      ? MyProfileStepMeta[selectedKey.key]
      : IdealPartnerStepMeta[selectedKey.key]) as StepMeta<MyProfile | IdealPartner>);

  const onSelectProfile = (key: keyof typeof MyProfileStepMeta) => {
    setSelectedKey({ section: 'PROFILE', key });
  };

  const onSelectIdealPartner = (key: keyof typeof IdealPartnerStepMeta) => {
    setSelectedKey({ section: 'IDEAL_PARTNER', key });
  };

  const onCompleteEdit = () => {
    setSelectedKey(null);
    toast.success('변경사항이 저장되었습니다.', { icon: null });
  };

  return (
    <>
      <button className={styles.FloatingButton} onClick={() => setOpen(true)} style={floatingButtonPosition.current}>
        <List />
      </button>
      <BottomSheet detent={'full-height'} disableDrag isOpen={open} onClose={onClose}>
        <BottomSheet.Header onPrev={selectedKey ? () => setSelectedKey(null) : undefined} onClose={onClose} />
        <BottomSheet.Content className={styles.Content}>
          {selectedKey === null && (
            <div className={styles.MenuWrapper}>
              <div className={styles.TitleSection}>
                <h2>수정하고 싶은 항목을 선택해주세요.</h2>
              </div>
              <ScrollView rootClassName={styles.MenuSection} viewportClassName={styles.MenuSectionViewport}>
                <div>
                  <p className={styles.MenuSectionTitle}>내 정보</p>
                  {ProfileMetaList.map(([key, { shortcutTitle }]) => (
                    <MenuButton
                      key={key}
                      text={shortcutTitle}
                      disabled={!myProfileTouchedSteps.has(key)}
                      onClick={() => onSelectProfile(key)}
                    />
                  ))}
                </div>
                <Spacing size={24} />
                <div>
                  <p className={styles.MenuSectionTitle}>이상형 정보</p>
                  {IdealPartnerMetaList.map(([key, { shortcutTitle }]) => (
                    <MenuButton
                      key={key}
                      text={shortcutTitle}
                      disabled={!idealPartnerTouchedSteps.has(key)}
                      onClick={() => onSelectIdealPartner(key)}
                    />
                  ))}
                </div>
              </ScrollView>
            </div>
          )}
          {selectedKey !== null && selectedStep && (
            <div className={styles.FormWrapper}>
              <ProfileEditBody type={selectedKey.section} stepMeta={selectedStep} onCompleteEdit={onCompleteEdit} />
            </div>
          )}
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};

const MenuButton = ({ text, disabled, onClick }: { text: string; disabled: boolean; onClick: () => void }) => {
  return (
    <Button
      className={styles.MenuButton}
      widthType={'fill'}
      variant={'ghost'}
      color={'neutral'}
      size={'M'}
      textAlign={'left'}
      suffixSlot={<ArrowRight />}
      disabled={disabled}
      onClick={onClick}
    >
      {text}
    </Button>
  );
};
