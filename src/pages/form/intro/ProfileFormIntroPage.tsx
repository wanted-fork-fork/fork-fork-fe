import { Button } from 'src/shared/ui/Button/Button';
import { CheckBox } from 'src/shared/ui/CheckBox/CheckBox';
import { useBoolean } from 'src/shared/functions/useBoolean';
import styles from './ProfileFormIntroPage.module.css';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { PRIVACY_POLICY_URL, TERM_URL } from 'src/shared/constants/url';
import { InfoBox } from 'src/shared/ui/InfoBox/InfoBox';

export const ProfileFormIntroPage = ({
  matchMakerName,
  onClickNextStep,
}: {
  matchMakerName: string;
  onClickNextStep: () => void;
}) => {
  const { value: isOpen, setTrue: open, setFalse: close } = useBoolean(false);

  const {
    value: checkedPrivacy,
    toggle: togglePrivacy,
    setTrue: setPrivacyTrue,
    setFalse: setPrivacyFalse,
  } = useBoolean(false);
  const {
    value: checkedServiceTerm,
    toggle: toggleServiceTerm,
    setTrue: setTermTrue,
    setFalse: setTermFalse,
  } = useBoolean(false);

  const canGoNext = checkedPrivacy && checkedServiceTerm;

  const handleClickCheckAll = () => {
    if (!checkedPrivacy || !checkedServiceTerm) {
      setPrivacyTrue();
      setTermTrue();
    } else {
      setPrivacyFalse();
      setTermFalse();
    }
  };

  return (
    <>
      <div className={styles.Wrapper}>
        <div />
        <h2>
          {matchMakerName}님이
          <br />
          정보 입력 요청을 보냈어요.
          <br />
          정성껏 입력주시면 보답드릴게요 :)
        </h2>
        <img className={styles.Image} src={'/images/googoo_5.png'} alt={'종이를 든 구구'} />
        <div>
          <div className={styles.TermWrapper}>
            <div className={styles.CheckListAllToggle}>
              <CheckBox checked={canGoNext} label={'약관 전체 동의'} onChange={handleClickCheckAll} />
            </div>
            <hr />
            <div className={styles.CheckListItem}>
              <CheckBox
                shape={'line'}
                checked={checkedServiceTerm}
                label={'(필수) 이용약관 전체 동의'}
                onChange={toggleServiceTerm}
              />
              <a href={TERM_URL} target="_blank" rel="noreferrer">
                보기
              </a>
            </div>
            <div className={styles.CheckListItem}>
              <CheckBox
                shape={'line'}
                checked={checkedPrivacy}
                label={'(필수) 개인정보 처리방침 동의'}
                onChange={togglePrivacy}
              />
              <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer">
                보기
              </a>
            </div>
          </div>
          <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={open} disabled={!canGoNext}>
            시작하기
          </Button>
        </div>
      </div>
      <BottomSheet isOpen={isOpen} onClose={close} detent={'content-height'}>
        <BottomSheet.Content
          footerSlot={
            <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={onClickNextStep}>
              확인했어요
            </Button>
          }
        >
          <h2 className={styles.InfoTitle}>잠깐! 입력 전 먼저 확인해주세요.</h2>
          <div className={styles.ContentWrapper}>
            <InfoBox className={styles.Box} radiusSize={'S'}>
              <div className={styles.Icon}>🔒</div>
              <div className={styles.Content}>
                <h3>비밀 지켜드릴게요!</h3>
                <p>주선자와 주선자가 지정한 사람만 볼 수 있어요.</p>
              </div>
            </InfoBox>
            <InfoBox className={styles.Box} radiusSize={'S'}>
              <div className={styles.Icon}>😎</div>
              <div className={styles.Content}>
                <h3>솔직하게 작성해주세요.</h3>
                <p>작성자분과 더 잘 맞는 분을 찾는데 도움이 돼요.</p>
              </div>
            </InfoBox>
            <InfoBox className={styles.Box} radiusSize={'S'}>
              <div className={styles.Icon}>✏️</div>
              <div className={styles.Content}>
                <h3>완료 후 수정은 주선자에게 요청해주세요.</h3>
              </div>
            </InfoBox>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
