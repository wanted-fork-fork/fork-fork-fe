import { updateProfileImage, uploadImage, UserInfoResponse } from 'src/types';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link, useNavigate, useRevalidator } from '@remix-run/react';
import { ArrowRight, Camera } from 'src/shared/ui/icons';
import styles from './MyInfoEditPage.module.css';
import { Theme } from 'src/shared/styles/constants';
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { UploadTrigger } from 'src/shared/ui/UploadTrigger/UploadTrigger';
import { UserAvatar } from 'src/domains/user/components/UserAvatar';

export const MyInfoEditPage = ({ userInfo }: { userInfo: UserInfoResponse }) => {
  const navigate = useNavigate();
  const { revalidate } = useRevalidator();

  const isChangePasswordDisabled = Boolean(userInfo.email);

  const { mutateAsync: mutateUploadImage } = useMutation({ mutationFn: uploadImage });
  const { mutateAsync: mutateUpdateProfileImage } = useMutation({ mutationFn: updateProfileImage });

  const handleUploadProfile = async (file: File[]) => {
    const { data } = await mutateUploadImage({ image: file[0] });
    const { data: isSuccess } = await mutateUpdateProfileImage({ profileImage: data.url });
    if (isSuccess) {
      revalidate();
      toast.success('프로필 이미지를 변경했습니다.');
    }
  };

  return (
    <>
      <Header onPrev={() => navigate('/mypage')}>회원 정보</Header>
      <div className={styles.Container}>
        <div className={styles.UserAvatar}>
          <UserAvatar imageSrc={userInfo.profileImage} size={88} />
          <UploadTrigger onUploadFiles={handleUploadProfile} multiple={false} accept={'image/*'}>
            {(onTriggerUpload) => (
              <button className={styles.ImageUploadTrigger} onClick={onTriggerUpload}>
                <Camera color={Theme.color.neutral30} />
              </button>
            )}
          </UploadTrigger>
        </div>
        <div className={styles.UserInfo}>
          <div className={styles.InfoRow}>
            <p className={styles.Label}>이름</p>
            <Link to={'/profile/edit/name'}>
              <div className={styles.Value}>
                <span>{userInfo.name}</span>
                <ArrowRight width={16} color={Theme.color.neutral50} />
              </div>
            </Link>
          </div>
          <div className={styles.InfoRow}>
            <p className={styles.Label}>아이디(E-Mail)</p>
            <div className={styles.Value}>
              <span className={styles.Gray}>{userInfo.email}</span>
              <span className={styles.Primary}>인증 완료</span>
            </div>
          </div>
          <div className={styles.InfoRow}>
            <p className={styles.Label}>비밀번호</p>
            <Link to={'/auth/change-password'}>
              <div className={styles.Value}>
                <span className={isChangePasswordDisabled ? styles.Gray : undefined}>
                  {isChangePasswordDisabled ? '비밀번호 재설정 불가능' : '비밀번호 재설정 가능'}
                </span>
                <ArrowRight
                  width={16}
                  color={isChangePasswordDisabled ? Theme.color.neutral40 : Theme.color.neutral50}
                />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};
