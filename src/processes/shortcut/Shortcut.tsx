import { ArrowLeft, ArrowRight, Close, List } from 'src/shared/ui/icons';
import styles from './Shortcut.module.css';
import { Sheet } from 'react-modal-sheet';
import { useState } from 'react';
import { Button } from 'src/shared/ui/Button/Button';
import { MyProfileStepMeta } from 'src/pages/form/my_profile/MyProfileStepMeta';
import { IdealPartnerStepMeta } from 'src/pages/form/ideal_partner/IdealPartnerStepMeta';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';

export const Shortcut = () => {
  const [open, setOpen] = useState(true);
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

  const onClose = () => setOpen(false);

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
      <button className={styles.FloatingButton} onClick={() => setOpen(true)}>
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
                <div>
                  <p className={styles.MenuSectionTitle}>내 정보</p>
                  <MenuButton
                    text={'이름/성별/나이/키'}
                    disabled={false}
                    onClick={() => onSelectProfile('PERSONAL_INFO')}
                  />
                  <MenuButton text={'사진'} disabled={false} onClick={() => onSelectProfile('MY_IMAGE')} />
                  <MenuButton text={'MBTI'} disabled={false} onClick={() => onSelectProfile('MBTI')} />
                  <MenuButton text={'현재 하는 일'} disabled={false} onClick={() => onSelectProfile('JOB')} />
                  <MenuButton text={'주로 머무는 지역'} disabled={false} onClick={() => onSelectProfile('LOCATION')} />
                  <MenuButton text={'종교'} disabled={false} onClick={() => onSelectProfile('RELIGION')} />
                  <MenuButton text={'취미'} disabled={false} onClick={() => onSelectProfile('HOBBY')} />
                  <MenuButton
                    text={'술자리 빈도 및 흡연 여부'}
                    disabled={false}
                    onClick={() => onSelectProfile('SMOKE_ALCOHOL')}
                  />
                  <MenuButton text={'자기 소개'} disabled={false} onClick={() => onSelectIdealPartner('INTRODUCE')} />
                  <MenuButton
                    text={'선택 질문'}
                    disabled={false}
                    onClick={() => onSelectIdealPartner('MORE_QUESTION')}
                  />
                </div>
                <div>
                  <p className={styles.MenuSectionTitle}>이상형 정보</p>
                  <MenuButton text={'선호하는 연령대'} disabled={false} onClick={() => onSelectIdealPartner('AGE')} />
                  <MenuButton
                    text={'선호하는 키, 스타일'}
                    disabled={false}
                    onClick={() => onSelectIdealPartner('HEIGHT_STYLE')}
                  />
                  <MenuButton
                    text={'상대방이 주로 머무는 지역'}
                    disabled={false}
                    onClick={() => onSelectIdealPartner('LOCATION')}
                  />
                  <MenuButton text={'상대방의 취미'} disabled={false} onClick={() => onSelectIdealPartner('HOBBY')} />
                  <MenuButton text={'종교'} disabled={false} onClick={() => onSelectIdealPartner('RELIGION')} />
                  <MenuButton
                    text={'상대방의 음주 빈도'}
                    disabled={false}
                    onClick={() => onSelectIdealPartner('DRINKING')}
                  />
                  <MenuButton
                    text={'상대방의 흡연 여부'}
                    disabled={false}
                    onClick={() => onSelectIdealPartner('SMOKING')}
                  />
                  <MenuButton
                    text={'주선자에게 하고 싶은 말'}
                    disabled={false}
                    onClick={() => onSelectIdealPartner('TO_MATCHER')}
                  />
                </div>
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
