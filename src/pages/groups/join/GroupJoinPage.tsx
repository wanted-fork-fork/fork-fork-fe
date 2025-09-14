import { IntroLayout } from 'src/shared/ui/layout/IntroLayout';
import { Button } from 'src/shared/ui/Button/Button';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { Link, useNavigate } from '@remix-run/react';
import Flex from 'src/shared/ui/Flex/Flex';
import styles from './GroupJoinPage.module.css';
import { applyToJoinGroup, ValidateGroupInviteLinkResponse } from 'src/types';
import { useMutation } from '@tanstack/react-query';

export const GroupJoinPage = ({
  groupInfo,
  inviteKey,
}: {
  groupInfo: ValidateGroupInviteLinkResponse;
  inviteKey: string;
}) => {
  const navigate = useNavigate();

  const { value: isOpen, setTrue: openSheet } = useBoolean(false);

  const { mutate, isPending } = useMutation({
    mutationFn: applyToJoinGroup,
    onSuccess: () => {
      openSheet();
    },
  });

  const handleClickJoin = () => {
    mutate({ inviteKey });
  };

  const handleCloseConfirm = () => {
    navigate('/');
  };

  return (
    <>
      <IntroLayout
        title={
          <>
            후보자 공유 그룹에 참여하여 <br />
            함께 좋은 인연 만들어가요.
          </>
        }
        description={
          <>
            {`관리자: ${groupInfo.creatorName}`}
            <br />
            {`그룹명: ${groupInfo.groupName}`}
          </>
        }
        imgUrl={'/images/join.png'}
        imgAlt={'이미지'}
        footer={
          <Button widthType={'fill'} onClick={handleClickJoin} disabled={isPending}>
            그룹 참여 신청
          </Button>
        }
      />
      <BottomSheet isOpen={isOpen} onClose={handleCloseConfirm} detent={'content-height'}>
        <BottomSheet.Content>
          <Flex direction={'vertical'} align={'start'} gap={32}>
            <Flex className={styles.TitleWrapper} direction={'vertical'} align={'start'} gap={16}>
              <h3>그룹 참여 신청이 완료되었습니다.</h3>
              <p>
                그룹장이 참여 신청을 수락하면
                <br />
                그룹 활동을 시작할 수 있어요.
              </p>
            </Flex>
            <Link to={'/'} style={{ width: '100%' }}>
              <Button widthType={'fill'}>구구 둘러보기</Button>
            </Link>
          </Flex>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
