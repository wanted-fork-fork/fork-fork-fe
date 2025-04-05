import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link } from '@remix-run/react';
import { Alert, ArrowLeft } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { InfoBox } from 'src/shared/ui/InfoBox/InfoBox';
import { Button } from 'src/shared/ui/Button/Button';
import styles from 'src/pages/auth/account_delete/AccountDeletePage.module.css';
import { useDeleteAccount } from 'src/features/DeleteAccount/useDeleteAccount';
import { useState } from 'react';
import { ConfirmModal } from 'src/shared/ui/ConfirmModal/ConfirmModal';
import { redirectToLoginPage } from 'src/shared/functions/redirectToLoginPage';
import { UserInfoResponse } from 'src/types';

export const AccountDeletePage = ({ userInfo }: { userInfo: UserInfoResponse }) => {
  const [showConfirm, setShowConfirm] = useState(false);

  const name = userInfo.name;

  const deleteAccount = useDeleteAccount();

  const onClickDeleteAccount = async () => {
    await deleteAccount({});
    setShowConfirm(true);
  };

  return (
    <div className={styles.Wrapper}>
      <Header
        prefixSlot={
          <Link to={'/mypage'}>
            <ArrowLeft color={Theme.color.neutral50} />
          </Link>
        }
      >
        회원 탈퇴
      </Header>
      <div className={styles.Body}>
        <h2>
          {name}님,
          <br />
          정말로 구구를 떠나실건가요?
        </h2>
        <div className={styles.BoxContainer}>
          <InfoBox className={styles.Box} radiusSize={'S'}>
            <Alert color={'#fff'} />
            <div className={styles.Content}>
              <h3>회원 탈퇴 시 소개 후보 정보가 모두 사라져요.</h3>
              <p>그동안 모은 소개팅 후보의 정보를 다시 볼 수 없어요.</p>
            </div>
          </InfoBox>
          <InfoBox className={styles.Box} radiusSize={'S'}>
            <Alert color={'#fff'} />
            <div className={styles.Content}>
              <h3>계정 정보가 삭제되어 복구가 어려워요.</h3>
              <p>구구를 다시 사용하시려면 다시 회원가입 해야해요.</p>
            </div>
          </InfoBox>
        </div>
        <img src={'/images/404.png'} alt={'놀라는 구구 이미지'} />
        <Button onClick={onClickDeleteAccount} widthType={'fill'}>
          회원 탈퇴
        </Button>
      </div>
      <ConfirmModal
        title={'회원 탈퇴가 완료되었습니다.'}
        description={'지금까지 구구를 이용해주셔서 감사합니다.\n구구가 필요할 때 또 찾아주세요!'}
        show={showConfirm}
        confirmText={'닫기'}
        onConfirm={redirectToLoginPage}
      />
    </div>
  );
};
