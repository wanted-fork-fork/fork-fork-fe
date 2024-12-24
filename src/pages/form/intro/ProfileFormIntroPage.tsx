import { Button } from 'src/shared/ui/Button/Button';
import { CheckBox } from 'src/shared/ui/CheckBox/CheckBox';
import { useBoolean } from 'src/shared/functions/useBoolean';
import styles from './ProfileFormIntroPage.module.css';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { PRIVACY_POLICY_URL, TERM_URL } from 'src/shared/constants/url';

export const ProfileFormIntroPage = ({ onClickNextStep }: { onClickNextStep: () => void }) => {
  const { value: isOpen, setTrue: open, setFalse: close } = useBoolean(false);

  const { value: checkedPrivacy, toggle: togglePrivacy } = useBoolean(false);
  const { value: checkedServiceTerm, toggle: toggleServiceTerm } = useBoolean(false);
  const { value: checkedTerm, toggle: toggleTerm } = useBoolean(false);

  const canGoNext = checkedPrivacy && checkedServiceTerm && checkedTerm;

  return (
    <>
      <div className={styles.Wrapper}>
        <div />
        <h2>
          성심 성의껏 답변해주신다면,
          <br />
          저도 꼭 좋은 인연으로 보답할게요!
        </h2>
        <img className={styles.Image} src={'/images/googoo_1.png'} alt={'종이를 든 구구'} />
        <Button variant={'filled'} widthType={'fill'} color={'primary'} onClick={open}>
          시작하기
        </Button>
      </div>
      <BottomSheet isOpen={isOpen} onClose={close} detent={'content-height'}>
        <BottomSheet.Header onClose={close} />
        <BottomSheet.Content
          footerSlot={
            <Button
              variant={'filled'}
              widthType={'fill'}
              color={'primary'}
              disabled={!canGoNext}
              onClick={onClickNextStep}
            >
              확인했어요
            </Button>
          }
        >
          <h2 className={styles.InfoTitle}>잠깐! 입력 전 먼저 확인해주세요.</h2>
          <div className={styles.ContentWrapper}>
            <div className={styles.CheckListItem}>
              <CheckBox checked={checkedPrivacy} label={'개인정보 처리방침 동의'} onChange={togglePrivacy} />
              <a href={PRIVACY_POLICY_URL} target="_blank" rel="noreferrer">
                보기
              </a>
            </div>
            <div className={styles.CheckListItem}>
              <CheckBox checked={checkedServiceTerm} label={'이용약관 확인'} onChange={toggleServiceTerm} />
              <a href={TERM_URL} target="_blank" rel="noreferrer">
                보기
              </a>
            </div>
            <div className={styles.CheckListItem}>
              <CheckBox checked={checkedTerm} label={'안내사항을 모두 확인했습니다.'} onChange={toggleTerm} />
            </div>
            <ul className={styles.InfoList}>
              <li className={styles.InfoListItem} style={{ '--marker': '"😎"' }}>
                작성한 내용 그대로 다른 사람에게 보여져요.
                <br />
                진솔한 자기소개 기대할게요!
              </li>
              <li className={styles.InfoListItem} style={{ '--marker': '"🔒"' }}>
                주선자가 지정한 사람에게만 공유되고
                <br />그 외의 목적으로는 사용하지 않습니다.
              </li>
              <li className={styles.InfoListItem} style={{ '--marker': '"✏️"' }}>
                완료 후 수정은 주선자에게 요청해주세요.
              </li>
            </ul>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
