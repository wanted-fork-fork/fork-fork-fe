import { LoaderFunction } from '@remix-run/node';
import { fullProfileMock } from 'src/entities/profile/api/__mock__/fullProfile.mock';
import { useLoaderData } from '@remix-run/react';
import { ProfilePage } from 'src/pages/profile/ProfilePage';

export const loader: LoaderFunction = ({ params }) => {
  const { key } = params;

  if (!key) {
    throw new Response('', {
      status: 404,
      statusText: 'Not Found',
    });
  }

  return { profile: fullProfileMock };
};

export default function Page() {
  const { profile } = useLoaderData<typeof loader>();
  return <ProfilePage />;
}
