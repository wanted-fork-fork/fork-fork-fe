import { useEffect } from 'react';
import styles from 'src/entities/candidates/info/processes/LocationForm/LocationForm.module.css';
import { Close } from 'src/shared/ui/icons';
import { Location } from 'src/entities/candidates/_common/vo/location/types/location';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { LocationSelectTable } from 'src/entities/candidates/_common/components/LocationSelectTable/LocationSelectTable';
import { useMultiSelectToggle } from 'src/shared/functions/useMultiSelectToggle';
import { useTranslation } from 'react-i18next';
import { useMyProfileStore } from 'src/entities/candidates/info/models/myProfileStore';
import { getLocationText } from 'src/entities/candidates/info/utils/getLocationText';
import { useMyProfileFormProcessStore } from 'src/entities/candidates/info/processes/_store/myProfileFormProcessStore';

const MAX_LOCATION_COUNT = 5;

export const LocationForm = () => {
  const { t } = useTranslation();

  const addTouchedStep = useMyProfileFormProcessStore((state) => state.addTouchedStep);

  const locations = useMyProfileStore((state) => state.location);
  const { list: selectedTownList, toggle: toggleTown } = useMultiSelectToggle<Location>(
    locations,
    (a, b) => a.town[0]?.town === b.town[0]?.town,
    { maxCount: MAX_LOCATION_COUNT },
  );

  const handleSelectLocation = (loc: Location) => {
    toggleTown(loc);
    addTouchedStep('PROFILE_LOCATION');
  };

  const setLocation = useMyProfileStore((state) => state.setLocation);

  useEffect(() => {
    setLocation(selectedTownList);
  }, [selectedTownList, setLocation]);

  return (
    <section className={styles.Section}>
      <div className={styles.ChipWrapper}>
        {selectedTownList.map((location) => (
          <Chip
            key={location.town[0].townName}
            suffixSlot={<Close width={18} />}
            onClick={() => handleSelectLocation(location)}
          >
            {getLocationText(location, t)}
          </Chip>
        ))}
      </div>
      <LocationSelectTable selectedLocations={selectedTownList} selectLocation={handleSelectLocation} />
    </section>
  );
};
