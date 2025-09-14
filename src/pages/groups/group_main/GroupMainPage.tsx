import { GroupListResponse } from 'src/types';
import { FormLayout } from 'src/pages/layout/FormLayout';
import { Header } from 'src/shared/ui/layout/Header/Header';
import { Link, useNavigate } from '@remix-run/react';
import Flex from 'src/shared/ui/Flex/Flex';
import { IconButton } from 'src/shared/ui/IconButton/IconButton';
import { ListAlt, Setting } from 'src/shared/ui/icons';
import { Theme } from 'src/shared/styles/constants';
import { FloatingButton } from 'src/shared/ui/FloatingButton/FloatingButton';

export const GroupMainPage = ({ groupInfo }: { groupInfo: GroupListResponse }) => {
  const navigate = useNavigate();

  return (
    <FormLayout.Container>
      <Header
        onPrev={() => navigate('/groups')}
        suffixSlot={
          <Flex direction={'horizontal'} gap={20}>
            <Link to={`/groups/${groupInfo.groupId}/history`}>
              <IconButton>
                <ListAlt color={Theme.color.neutral50} />
              </IconButton>
            </Link>
            <Link to={`/groups/${groupInfo.groupId}/info`}>
              <IconButton>
                <Setting color={Theme.color.neutral50} />
              </IconButton>
            </Link>
          </Flex>
        }
      >
        {groupInfo.groupName}
      </Header>
      <Link to={`/groups/${groupInfo.groupId}/add`}>
        <FloatingButton
          text={'후보 추가'}
          onClick={() => {
            /**/
          }}
        />
      </Link>
    </FormLayout.Container>
  );
};
