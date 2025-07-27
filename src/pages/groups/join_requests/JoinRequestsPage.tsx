import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link } from '@remix-run/react';
import { ArrowLeft } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { MemberRow } from 'src/entities/groups/components/member_row/MemberRow';
import { Button } from 'src/shared/ui/Button/Button';
import { GroupMember } from 'src/entities/groups/mocks/groupInfoMock';
import Flex from 'src/shared/ui/Flex/Flex';
import toast from 'react-hot-toast';
import styles from './JoinRequestsPage.module.css';

export const JoinRequestsPage = ({ requestList, groupId }: { requestList: GroupMember[]; groupId: number }) => {
  const handleClickReject = () => {
    toast.success('참여 신청을 거절했어요');
  };

  const handleClickAccept = () => {
    toast.success('참여 신청을 수락했어요');
  };

  return (
    <div>
      <Header
        prefixSlot={
          <Link to={`/groups/${groupId}/info`}>
            <ArrowLeft color={Theme.color.neutral50} />
          </Link>
        }
      >
        참여자 목록
      </Header>
      <div>
        {requestList.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            suffix={
              <Flex gap={8}>
                <Button size={'S'} color={'neutral'} variant={'outline'} onClick={handleClickReject}>
                  거절
                </Button>
                <Button size={'S'} color={'neutral'} variant={'outline'} onClick={handleClickAccept}>
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
