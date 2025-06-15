import styles from 'src/entities/candidates/ideal_partner/processes/LocationForm/LocationForm.module.css';
import { IdealPartnerRequestLocation } from 'src/types';
import { useIdealPartnerFormProcessStore } from 'src/entities/candidates/ideal_partner/processes/_store/idealPartnerFormProcessStore';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { useProfileFirstName } from 'src/entities/candidates/info/utils/useProfileFirstName';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { Radio } from 'src/shared/ui/Radio/Radio';
import { getLocationText } from 'src/entities/candidates/info/utils/getLocationText';
import { useTranslation } from 'react-i18next';

export const LocationForm = () => {
  const { t } = useTranslation();
  const name = useProfileFirstName();
  const selectedLocations = useMyProfileStore((state) => state.location);

  const locations = useIdealPartnerStore((state) => state.locations);
  const setLocations = useIdealPartnerStore((state) => state.setLocation);
  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);

  const onSelect = (category: IdealPartnerRequestLocation) => {
    setLocations(category);
    addTouchedStep('IDEAL_LOCATION');
  };

  return (
    <section className={styles.Section}>
      <div>
        <Radio
          label={'네, 저와 가까운 분을 선호해요'}
          checked={locations === 'IMPORTANT'}
          onChange={() => onSelect('IMPORTANT')}
        />
        {locations === 'IMPORTANT' && (
          <div>
            <small className={styles.Description}>{name}님이 선택하신 지역</small>
            <div className={styles.ChipWrapper}>
              {selectedLocations.map((l) => (
                <Chip key={l.town[0].town} className={styles.Chip}>
                  {getLocationText(l, t)}
                </Chip>
              ))}
            </div>
          </div>
        )}
        <Radio
          label={'상관없어요'}
          checked={locations === 'NOT_IMPORTANT'}
          onChange={() => onSelect('NOT_IMPORTANT')}
        />
      </div>
    </section>
  );
};
