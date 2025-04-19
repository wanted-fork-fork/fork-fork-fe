import { ProfileFormIntroPage } from 'src/pages/form/intro/ProfileFormIntroPage';
import { useMemo, useState } from 'react';
import { SwitchCase } from 'src/shared/ui/SwitchCase';
import { MyProfilePage } from 'src/pages/form/my_profile/MyProfilePage';
import { IdealPartnerIntroPage } from 'src/pages/form/intro/IdealPartnerIntroPage';
import { IdealPartnerPage } from 'src/pages/form/ideal_partner/IdealPartnerPage';
import { FormConfirmPage } from 'src/pages/form/confirm/FormConfirmPage';
import { UploadLoadingPage } from 'src/pages/form/complete/UploadLoadingPage';
import { CompletePage } from 'src/pages/form/complete/CompletePage';
import styles from 'src/app/styles/form.module.css';
import { getMatchMakerName, saveInfo, validateLink } from 'src/types';
import { ActionFunctionArgs, json, LoaderFunctionArgs, MetaFunction } from '@remix-run/node';
import { useBeforeUnload, useLoaderData } from '@remix-run/react';
import { useProfileFirstName } from 'src/domains/candidates/info/entities/libs/useProfileFirstName';
import { Shortcut } from 'src/domains/candidates/components/Shortcut/Shortcut';

const MAX_STEP_COUNT = 7;

const createFormPageStep = ({
  matchMakerName,
  name,
  linkKey,
  increase,
}: {
  matchMakerName: string;
  name: string;
  linkKey: string;
  increase: () => void;
}) => ({
  0: <ProfileFormIntroPage matchMakerName={matchMakerName} onClickNextStep={increase} />,
  1: <MyProfilePage onClickNextStep={increase} />,
  2: <IdealPartnerIntroPage name={name} onClickNextStep={increase} />,
  3: <IdealPartnerPage onClickNextStep={increase} />,
  4: <FormConfirmPage onClickNextStep={increase} />,
  5: <UploadLoadingPage name={name} linkKey={linkKey} onComplete={increase} />,
  6: <CompletePage />,
});

export const meta: MetaFunction = () => {
  return [
    { title: '[구구] 당신에 대해 알려주세요!' },
    { name: 'description', content: '당신은 어떤 사람인가요? 입력해주시면 좋은 소식 전해드릴게요!' },
    { property: 'og:image', content: 'https://www.meetgoogoo.com/images/meta_form.png' },
    { property: 'og:image:width', content: '800' },
    { property: 'og:image:height', content: '400' },
  ];
};

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { key } = params;
  if (!key) throw new Response('', { status: 404 });

  const { data } = await validateLink(key);
  if (!data.isValid) throw new Response('', { status: 404 });

  const { data: matchMakerName } = await getMatchMakerName(key);

  return json({ linkKey: key, matchMakerName });
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
  const { linkKey, matchMakerName } = useLoaderData<typeof loader>();
  const name = useProfileFirstName();

  const [step, setStep] = useState(0);
  const increase = () => setStep((prev) => (prev + 1 < MAX_STEP_COUNT ? prev + 1 : prev));

  const formPageStep = useMemo(
    () => createFormPageStep({ name, linkKey, increase, matchMakerName }),
    [linkKey, matchMakerName, name],
  );

  const showShortcut = [1, 3, 4].includes(step);

  useBeforeUnload((e) => e.preventDefault());

  return (
    <div className={styles.Wrapper}>
      <SwitchCase value={step} caseBy={formPageStep} />
      {showShortcut && <Shortcut right={'20px'} bottom={'100px'} />}
    </div>
  );
}
