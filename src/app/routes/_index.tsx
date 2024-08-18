import type { LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { json } from '@remix-run/node';
import { GenerateFormLink } from 'src/widgets/GenerateFormLink/GenerateFormLink';
import { authenticate } from 'src/app/server/authenticate';
import { getAuthSession } from 'src/app/server/sessions';

export const meta: MetaFunction = () => {
  return [{ title: '구구' }, { name: 'description', content: '내 사랑을 구해줄래? 구해줄게!' }];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const session = await getAuthSession(request);
  await authenticate(request, session);
  return json({});
};

export default function Index() {
  return (
    <>
      {/*<InfoListPage />*/}
      <GenerateFormLink />
    </>
  );
}
