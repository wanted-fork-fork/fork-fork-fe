import { useEffect } from 'react';
import styles from './LocationForm.module.css';
import { Close } from 'src/shared/ui/icons';
import { Location } from 'src/entities/location/types/location';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { useMyProfileStore } from 'src/entities/profile/model/myProfileStore';
import { LocationSelectTable } from 'src/widgets/LocationSelectTable/LocationSelectTable';
import { useMultiSelectToggle } from 'src/shared/functions/useMultiSelectToggle';

const MAX_LOCATION_COUNT = 5;

export const LocationForm = () => {
  const locations = useMyProfileStore((state) => state.location);
  const { list: selectedTownList, toggle: toggleTown } = useMultiSelectToggle<Location>(
    locations,
    (a, b) => a.town[0]?.town === b.town[0]?.town,
    { maxCount: MAX_LOCATION_COUNT },
  );

  const handleSelectLocation = (loc: Location) => {
    toggleTown(loc);
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
            {location.city.cityName} {location.town[0].townName}
          </Chip>
        ))}
      </div>
      <LocationSelectTable selectedLocations={selectedTownList} selectLocation={handleSelectLocation} />
    </section>
  );
};
