import styles from 'src/entities/candidates/ideal_partner/processes/ideal_partner/LocationForm/LocationForm.module.css';
import { RadioList, RadioMeta } from 'src/shared/ui/RadioList/RadioList';
import { IdealPartnerRequestLocation } from 'src/types';
import { useIdealPartnerFormProcessStore } from 'src/entities/candidates/ideal_partner/processes/ideal_partner/_store/idealPartnerFormProcessStore';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { useProfileFirstName } from 'src/entities/candidates/info/entities/libs/useProfileFirstName';
import { useMyProfileStore } from 'src/entities/candidates/info/entities/models/myProfileStore';
import { useIdealPartnerStore } from 'src/entities/candidates/ideal_partner/entities/models/idealPartnerStore';

const locationRadioMeta: RadioMeta<IdealPartnerRequestLocation>[] = [
  { key: 'IMPORTANT', allowInput: false, name: '네, 저와 가까운 분을 선호해요' },
  { key: 'NOT_IMPORTANT', allowInput: false, name: '상관없어요' },
];

export const LocationForm = () => {
  const name = useProfileFirstName();
  const selectedLocations = useMyProfileStore((state) => state.location);

  const locations = useIdealPartnerStore((state) => state.locations);
  const setLocations = useIdealPartnerStore((state) => state.setLocation);
  const touchedSteps = useIdealPartnerFormProcessStore((state) => state.touchedSteps);
  const addTouchedStep = useIdealPartnerFormProcessStore((state) => state.addTouchedStep);

  const onSelect = (category: IdealPartnerRequestLocation) => {
    setLocations(category);
    addTouchedStep('IDEAL_LOCATION');
  };

  return (
    <section className={styles.Section}>
      <div>
        <small className={styles.Description}>{name}님이 선택하신 지역</small>
        <div className={styles.ChipWrapper}>
          {selectedLocations.map((l) => (
            <Chip key={l.town[0].town} className={styles.Chip}>
              {l.city.cityName} {l.town[0].townName}
            </Chip>
          ))}
        </div>
      </div>
      <div>
        <RadioList
          radioMetaList={locationRadioMeta}
          selected={touchedSteps.has('IDEAL_LOCATION') ? locations : null}
          onSelect={onSelect}
        />
      </div>
    </section>
  );
};
