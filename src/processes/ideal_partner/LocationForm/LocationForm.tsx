import { useEffect } from 'react';
import styles from './LocationForm.module.css';
import { Close } from 'src/shared/ui/icons';
import { Location } from 'src/entities/location/types/location';
import { Chip } from 'src/shared/ui/Chip/Chip';
import { LocationSelectTable } from 'src/widgets/LocationSelectTable/LocationSelectTable';
import { useMultiSelectToggle } from 'src/shared/functions/useMultiSelectToggle';
import { useIdealPartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';

const MAX_LOCATION_COUNT = 5;

export const LocationForm = () => {
  const locations = useIdealPartnerStore((state) => state.locations);
  const { list: selectedTownList, toggle: toggleTown } = useMultiSelectToggle<Location>(
    locations,
    (a, b) => a.town[0]?.town === b.town[0]?.town,
  );

  const handleSelectLocation = (loc: Location) => {
    if (selectedTownList.length >= MAX_LOCATION_COUNT) {
      return;
    }
    toggleTown(loc);
  };

  const setLocation = useIdealPartnerStore((state) => state.setLocation);
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
