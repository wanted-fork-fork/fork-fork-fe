import { Outlet } from '@remix-run/react';
import { MyProfileProvider } from 'src/domains/candidates/info/entities/models/myProfileStore';
import { IdealPartnerProvider } from 'src/domains/candidates/ideal_partner/entities/models/idealPartnerStore';

export default function ProfileFormLayout() {
  return (
    <MyProfileProvider>
      <IdealPartnerProvider>
        <Outlet />
      </IdealPartnerProvider>
    </MyProfileProvider>
  );
}
