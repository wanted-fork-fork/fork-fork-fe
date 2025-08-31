import { MemberListPage } from 'src/pages/groups/member_list/MemberListPage';
import { groupInfoMock } from 'src/entities/groups/mocks/groupInfoMock';

export default function GroupMemberListPage() {
  return <MemberListPage memberList={[]} group={groupInfoMock} isAdmin={false} />;
}
