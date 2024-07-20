import { ArrowLeft } from 'src/shared/ui/icons';
import { Button } from 'src/shared/ui/Button/Button';
import { Tab } from 'src/shared/ui/Tab/Tab';
import { MyProfileView } from 'src/entities/profile/ui/MyProfile/MyProfile';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { IdealPartnerProfile } from 'src/entities/ideal_partner/ui/IdealPartnerProfile/IdealPartnerProfile';
import styles from './FormConfirmPage.module.css';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Shortcut } from 'src/processes/shortcut/Shortcut';

const TAB_TYPE_LIST = ['PROFILE', 'IDEAL_PARTNER'] as const;
type TabType = (typeof TAB_TYPE_LIST)[number];

export const FormConfirmPage = () => {
  const profile = useMyProfileStore((state) => state);
  const idealPartner = useIdealPartnerStore((state) => state);
  return (
    <>
      <div className={styles.Wrapper}>
        <div>
          <Button variant={'ghost'} color={'neutral'} widthType={'fill'} size={'fit'}>
            <ArrowLeft />
          </Button>
        </div>
        <div className={styles.TitleSection}>
          <h2>입력한 정보를 마지막으로 확인해주세요.</h2>
          <small>각 답변을 선택하면 수정이 가능합니다.</small>
        </div>
        <Tab<TabType> initialTab={'PROFILE'}>
          <Tab.List>
            <Tab.Trigger tabType={'PROFILE'} name={'자기 소개'} />
            <Tab.Trigger tabType={'IDEAL_PARTNER'} name={'이상형 정보'} />
          </Tab.List>
          <ScrollView rootClassName={styles.ContentSection} viewportClassName={styles.ContentViewport}>
            <Tab.Content tabType={'PROFILE'}>
              <MyProfileView profile={profile} />
            </Tab.Content>
            <Tab.Content tabType={'IDEAL_PARTNER'}>
              <IdealPartnerProfile profile={idealPartner} />
            </Tab.Content>
          </ScrollView>
        </Tab>
        <div className={styles.Footer}>
          <Button variant={'filled'} widthType={'fill'} color={'primary'}>
            확인했어요
          </Button>
        </div>
        <Shortcut />
      </div>
    </>
  );
};
