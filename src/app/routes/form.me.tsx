import { useMemo, useState } from 'react';
import { SwitchCase } from 'src/shared/ui/SwitchCase';
import { MyProfilePage } from 'src/pages/form/my_profile/MyProfilePage';
import { IdealPartnerIntroPage } from 'src/pages/form/intro/IdealPartnerIntroPage';
import { IdealPartnerPage } from 'src/pages/form/ideal_partner/IdealPartnerPage';
import { FormConfirmPage } from 'src/pages/form/confirm/FormConfirmPage';
import { UploadLoadingPage } from 'src/pages/form/complete/UploadLoadingPage';
import { CompletePage } from 'src/pages/form/complete/CompletePage';
import { useProfileFirstName } from 'src/entities/profile/lib/useProfileFirstName';
import { Shortcut } from 'src/processes/shortcut/Shortcut';
import styles from 'src/app/styles/form.module.css';
import { getLinkByMatchMakerId, saveInfo } from 'src/types';
import { ActionFunctionArgs, json, LoaderFunction, MetaFunction } from '@remix-run/node';
import { useBeforeUnload, useLoaderData } from '@remix-run/react';
import { authenticate } from 'src/app/server/authenticate';
import { commitSession } from 'src/app/server/sessions';

/**
 * TODO: form.$key.tsx 페이지 복붙이니, 중복되는 부분 어느정도 공통화 필요
 */

const MAX_STEP_COUNT = 6;

const createFormPageStep = ({ name, linkKey, increase }: { name: string; linkKey: string; increase: () => void }) => ({
  0: <MyProfilePage onClickNextStep={increase} />,
  1: <IdealPartnerIntroPage name={name} onClickNextStep={increase} />,
  2: <IdealPartnerPage onClickNextStep={increase} />,
  3: <FormConfirmPage onClickNextStep={increase} />,
  4: <UploadLoadingPage name={name} linkKey={linkKey} onComplete={increase} />,
  5: <CompletePage />,
});

export const meta: MetaFunction = () => {
  return [
    { title: '[구구] 당신에 대해 알려주세요!' },
    { name: 'description', content: '당신은 어떤 사람인가요?' },
    { property: 'og:image', content: 'https://www.meetgoogoo.com/images/meta_form.png' },
    { property: 'og:image:width', content: '800' },
    { property: 'og:image:height', content: '400' },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const { accessToken, newSession } = await authenticate(request);

  const { data } = await getLinkByMatchMakerId({
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  return json(
    { linkKey: data.linkKey },
    {
      headers: {
        ...(newSession && { 'Set-Cookie': await commitSession(newSession) }),
      },
    },
  );
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const linkKey = body.get('linkKey');
  if (typeof linkKey !== 'string') return { status: 400 };

  try {
    const { data, status } = await saveInfo(
      // TODO: zod로 타입 체크
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      { userInfo: JSON.parse(body.get('userInfo')), idealPartner: JSON.parse(body.get('idealPartner')) },
      { linkKey },
    );

    return { status, data };
  } catch (e) {
    console.error(e, {
      userInfo: JSON.parse(body.get('userInfo') as string),
      idealPartner: JSON.parse(body.get('idealPartner') as string),
    });
    return { status: 500 };
  }
};

export default function ProfileFormPage() {
  const { linkKey } = useLoaderData<typeof loader>();
  const name = useProfileFirstName();

  const [step, setStep] = useState(0);
  const increase = () => setStep((prev) => (prev + 1 < MAX_STEP_COUNT ? prev + 1 : prev));

  const formPageStep = useMemo(() => createFormPageStep({ name, linkKey, increase }), [linkKey, name]);

  const showShortcut = [0, 2, 3].includes(step);

  useBeforeUnload((e) => e.preventDefault());

  return (
    <div className={styles.Wrapper}>
      <SwitchCase value={step} caseBy={formPageStep} />
      {showShortcut && <Shortcut right={'20px'} bottom={'100px'} />}
    </div>
  );
}
