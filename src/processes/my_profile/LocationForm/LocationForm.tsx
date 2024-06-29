import { useState } from 'react';
import styles from './LocationForm.module.css';
import { Close, Minus, Plus } from 'src/shared/ui/icons';
import { Location } from 'src/entities/location/types/location';
import { useMultiSelectToggle } from 'src/shared/functions/useMultiSelectToggle';
import { Chip } from 'src/shared/ui/Chip/Chip';

type LocationFormProps = {
  locations?: Location[];
};

export const LocationForm = ({ locations = [] }: LocationFormProps) => {
  const [selectedMainLocation, setSelectedMainLocation] = useState<Location>(locations[0]);
  const { list: selectedTownList, toggle: toggleTown } = useMultiSelectToggle<Location>(
    [],
    (a, b) => a.town[0]?.town === b.town[0]?.town,
  );

  return (
    <section>
      <div className={styles.ChipWrapper}>
        {selectedTownList.map((location) => (
          <Chip key={location.town[0].townName} suffixSlot={<Close width={18} />}>
            {location.city.cityName} {location.town[0].townName}
          </Chip>
        ))}
      </div>
      <div className={styles.Wrapper}>
        <ul className={styles.MainCategoryColumn}>
          {locations.map((location) => (
            <li
              key={location.city.city}
              className={`${styles.Category} ${styles.MainCategory}`}
              role={'option'}
              aria-selected={selectedMainLocation === location}
              onClick={() => setSelectedMainLocation(location)}
            >
              {location.city.cityName}
            </li>
          ))}
        </ul>
        <ul>
          {selectedMainLocation.town.map((town) => (
            <li
              key={town.townName}
              className={`${styles.Category} ${styles.SubCategory}`}
              onClick={() => toggleTown({ city: selectedMainLocation.city, town: [town] })}
            >
              {town.townName}
              {selectedTownList.some(({ town: selectedTown }) => selectedTown[0].town === town.town) ? (
                <Minus className={styles.Icon} width={16} height={16} color={'#cdcace'} />
              ) : (
                <Plus className={styles.Icon} width={16} height={16} color={'#cdcace'} />
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
