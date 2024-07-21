import { Outlet } from '@remix-run/react';
import { MyProfileProvider } from 'src/entities/profile/model/myProfileStore';
import { IdealPartnerProvider } from 'src/entities/ideal_partner/model/idealPartnerStore';

export default function ProfileFormLayout() {
  return (
    <MyProfileProvider>
      <IdealPartnerProvider>
        <Outlet />
      </IdealPartnerProvider>
    </MyProfileProvider>
  );
}
