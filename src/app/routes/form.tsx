import { Outlet } from '@remix-run/react';
import { MyProfileProvider } from 'src/entities/candidates/info/models/myProfileStore';
import { IdealPartnerProvider } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';

export default function ProfileFormLayout() {
  return (
    <MyProfileProvider>
      <IdealPartnerProvider>
        <Outlet />
      </IdealPartnerProvider>
    </MyProfileProvider>
  );
}
