import { EmailConfigPage } from 'src/pages/mypage/email/EmailConfigPage';
import toast from 'react-hot-toast';
import { useNavigate } from '@remix-run/react';

export default function AccountEmailEditPage() {
  const navigate = useNavigate();

  const handleConfirm = () => {
    const redirectTo = new URLSearchParams(location.search).get('redirect');
    navigate(redirectTo ?? '/');
    toast.success('메일이 설정되었습니다.', { icon: null });
  };

  return <EmailConfigPage onConfirm={handleConfirm} />;
}
