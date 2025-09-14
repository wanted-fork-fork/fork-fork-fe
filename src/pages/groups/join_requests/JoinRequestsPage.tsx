import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link, useRevalidator } from '@remix-run/react';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { MemberRow } from 'src/entities/groups/components/member_row/MemberRow';
import { Button } from 'src/shared/ui/Button/Button';
import Flex from 'src/shared/ui/Flex/Flex';
import toast from 'react-hot-toast';
import styles from './JoinRequestsPage.module.css';
import { GroupMemberResponse, manageMember } from 'src/types';

export const JoinRequestsPage = ({ requestList, groupId }: { requestList: GroupMemberResponse[]; groupId: string }) => {
  const revalidator = useRevalidator();

  const handleClickReject = async (userId: string) => {
    await manageMember(groupId, userId, { action: 'REJECT' });

    toast.success('참여 신청을 거절했어요');
    revalidator.revalidate();
  };

  const handleClickAccept = async (userId: string) => {
    await manageMember(groupId, userId, { action: 'APPROVE' });

    toast.success('참여 신청을 수락했어요');
    revalidator.revalidate();
  };

  return (
    <div className={styles.Container}>
      <Header
        prefixSlot={
          <Link to={`/groups/${groupId}/info`}>
            <ArrowLeft color={Theme.color.neutral50} />
          </Link>
        }
      >
        참여 요청 목록
      </Header>
      <div>
        {requestList.map((member) => (
          <MemberRow
            key={member.userId}
            member={member}
            suffix={
              <Flex gap={8}>
                <Button
                  size={'S'}
                  color={'neutral'}
                  variant={'outline'}
                  onClick={() => handleClickReject(member.userId)}
                >
                  거절
                </Button>
                <Button
                  size={'S'}
                  color={'neutral'}
                  variant={'outline'}
                  onClick={() => handleClickAccept(member.userId)}
                >
                  수락
                </Button>
              </Flex>
            }
          />
        ))}
        {requestList.length === 0 && (
          <div className={styles.Empty}>
            <img src={'/images/empty.png'} alt={'수락 대기 중인 사람이 없습니다.'} width={120} height={120} />
            <p>수락 대기 중인 사람이 없습니다.</p>
          </div>
        )}
      </div>
    </div>
  );
};
