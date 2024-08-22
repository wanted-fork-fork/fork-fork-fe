import { ProfileFormIntroPage } from 'src/pages/form/intro/ProfileFormIntroPage';
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
import { saveInfo } from 'src/types';
import { ActionFunctionArgs, json, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';

const MAX_STEP_COUNT = 7;

const createFormPageStep = ({ name, linkKey, increase }: { name: string; linkKey: string; increase: () => void }) => ({
  0: <ProfileFormIntroPage onClickNextStep={increase} />,
  1: <MyProfilePage onClickNextStep={increase} />,
  2: <IdealPartnerIntroPage name={name} onClickNextStep={increase} />,
  3: <IdealPartnerPage onClickNextStep={increase} />,
  4: <FormConfirmPage onClickNextStep={increase} />,
  5: <UploadLoadingPage name={name} linkKey={linkKey} onComplete={increase} />,
  6: <CompletePage />,
});

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { key } = params;
  if (!key) throw new Response('', { status: 404 });

  // const { data } = await validateLink(key);
  // if (!data.isValid) throw new Response('', { status: 404 });

  return json({ linkKey: key });
};

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData();
  const linkKey = body.get('linkKey');
  if (typeof linkKey !== 'string') return { status: 400 };

  const { data, status } = await saveInfo(
    // TODO: zod로 타입 체크
    // TODO: 이미지 업로드
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { userInfo: JSON.parse(body.get('userInfo')), idealPartner: JSON.parse(body.get('idealPartner')) },
    { linkKey },
    {
      headers: {
        Authorization: `Bearer ${import.meta.env.VITE_DEV_JWT_TOKEN}`,
      },
    },
  );

  return { status, data };
};

export default function ProfileFormPage() {
  const { linkKey } = useLoaderData<typeof loader>();
  const name = useProfileFirstName();

  const [step, setStep] = useState(0);
  const increase = () => setStep((prev) => (prev + 1 < MAX_STEP_COUNT ? prev + 1 : prev));

  const formPageStep = useMemo(() => createFormPageStep({ name, linkKey, increase }), [linkKey, name]);

  const showShortcut = [1, 3, 4].includes(step);

  return (
    <div className={styles.Wrapper}>
      <SwitchCase value={step} caseBy={formPageStep} />
      {showShortcut && <Shortcut right={'20px'} bottom={'100px'} />}
    </div>
  );
}
