import { ArrowRight, List } from 'src/shared/ui/icons';
import styles from './Shortcut.module.css';
import { useRef, useState } from 'react';
import { Button } from 'src/shared/ui/Button/Button';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { useMyProfileFormProcessStore } from 'src/processes/my_profile/_store/myProfileFormProcessStore';
import { useIdealPartnerFormProcessStore } from 'src/processes/ideal_partner/_store/idealPartnerFormProcessStore';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';

export const Shortcut = ({ right, bottom }: { right: `${number}px`; bottom: `${number}px` }) => {
  const floatingButtonPosition = useRef({ right, bottom });

  const myProfileTouchedSteps = useMyProfileFormProcessStore((state) => state.touchedSteps);
  const ideaelPartnerTouchedSteps = useIdealPartnerFormProcessStore((state) => state.touchedSteps);

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
    (selectedKey.section === 'PROFILE' ? MyProfileStepMeta[selectedKey.key] : IdealPartnerStepMeta[selectedKey.key]);
  const name = useProfileFirstName();

  const onSelectProfile = (key: keyof typeof MyProfileStepMeta) => {
    setSelectedKey({ section: 'PROFILE', key });
  };

  const onSelectIdealPartner = (key: keyof typeof IdealPartnerStepMeta) => {
    setSelectedKey({ section: 'IDEAL_PARTNER', key });
  };

  return (
    <>
      <button className={styles.FloatingButton} onClick={() => setOpen(true)} style={floatingButtonPosition.current}>
        <List />
      </button>
      <BottomSheet detent={'full-height'} isOpen={open} onClose={onClose}>
        <BottomSheet.Header onPrev={selectedKey ? () => setSelectedKey(null) : undefined} onClose={onClose} />
        <BottomSheet.Content className={styles.Content}>
          {selectedKey === null && (
            <div className={styles.MenuWrapper}>
              <div className={styles.TitleSection}>
                <h2>수정하고 싶은 항목을 선택해주세요.</h2>
                <p>선택 시 해당 항목으로 이동합니다.</p>
              </div>
              <ScrollView rootClassName={styles.MenuSection} viewportClassName={styles.MenuSectionViewport}>
                <div>
                  <p className={styles.MenuSectionTitle}>내 정보</p>
                  {Array.from(Object.entries(MyProfileStepMeta)).map(([key, { shortcutTitle }]) => (
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
                  {Array.from(Object.entries(IdealPartnerStepMeta)).map(([key, { shortcutTitle }]) => (
                    <MenuButton
                      key={key}
                      text={shortcutTitle}
                      disabled={!ideaelPartnerTouchedSteps.has(key)}
                      onClick={() => onSelectIdealPartner(key)}
                    />
                  ))}
                </div>
              </ScrollView>
            </div>
          )}
          {selectedKey !== null && selectedStep && (
            <div className={styles.FormWrapper}>
              <div className={styles.FormHeader}>
                <h2>{selectedStep.title({ name })}</h2>
                {'description' in selectedStep && (
                  <small className={styles.Description}>{selectedStep.description()}</small>
                )}
              </div>
              <div className={styles.FormMain}>{selectedStep.form({})}</div>
              <div className={styles.FormFooter}>
                <Button variant={'filled'} widthType={'fill'} color={'primary'}>
                  변경사항 저장
                </Button>
              </div>
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
