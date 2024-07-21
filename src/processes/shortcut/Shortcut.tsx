import { ArrowLeft, ArrowRight, Close, List } from 'src/shared/ui/icons';
import styles from './Shortcut.module.css';
import { Sheet } from 'react-modal-sheet';
import { useRef, useState } from 'react';
import { Button } from 'src/shared/ui/Button/Button';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';

export const Shortcut = ({ right, bottom }: { right: `${number}px`; bottom: `${number}px` }) => {
  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);

  const floatingButtonPosition = useRef({ right, bottom });

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
      <Sheet detent={'full-height'} isOpen={open} onClose={onClose}>
        <Sheet.Container>
          <Sheet.Header className={styles.Header}>
            {selectedKey && (
              <Button
                variant={'ghost'}
                color={'neutral'}
                widthType={'hug'}
                size={'fit'}
                onClick={() => setSelectedKey(null)}
              >
                <ArrowLeft width={24} />
              </Button>
            )}
            <Button
              className={styles.CloseButton}
              variant={'ghost'}
              color={'neutral'}
              widthType={'hug'}
              size={'fit'}
              onClick={onClose}
            >
              <Close width={24} />
            </Button>
          </Sheet.Header>
          <Sheet.Content className={styles.Content}>
            {selectedKey === null && (
              <div className={styles.MenuWrapper}>
                <div>
                  <h2>수정하고 싶은 항목을 선택해주세요.</h2>
                  <p>선택 시 해당 항목으로 이동합니다.</p>
                </div>
                <ScrollView rootClassName={styles.MenuSection}>
                  <div>
                    <p className={styles.MenuSectionTitle}>내 정보</p>
                    {Array.from(Object.entries(MyProfileStepMeta)).map(([key, { shortcutTitle, canGoNext }], idx) => (
                      <MenuButton
                        key={key}
                        text={shortcutTitle}
                        disabled={canGoNext(profile)}
                        onClick={() => onSelectProfile(key)}
                      />
                    ))}
                  </div>
                  <Spacing size={24} />
                  <div>
                    <p className={styles.MenuSectionTitle}>이상형 정보</p>
                    {Array.from(Object.entries(IdealPartnerStepMeta)).map(([key, { shortcutTitle, canGoNext }]) => (
                      <MenuButton
                        key={key}
                        text={shortcutTitle}
                        disabled={canGoNext(idealPartner)}
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
                  {selectedStep.description && (
                    <small className={styles.Description}>{selectedStep.description()}</small>
                  )}
                </div>
                <div className={styles.FormMain}>{selectedStep.form}</div>
                <div className={styles.FormFooter}>
                  <Button variant={'filled'} widthType={'fill'} color={'primary'}>
                    변경사항 저장
                  </Button>
                </div>
              </div>
            )}
          </Sheet.Content>
        </Sheet.Container>
        <Sheet.Backdrop />
      </Sheet>
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
