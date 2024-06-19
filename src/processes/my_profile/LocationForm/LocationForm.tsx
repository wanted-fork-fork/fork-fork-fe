import { useState } from 'react';
import styles from './LocationForm.module.css';
import { Plus } from 'src/shared/ui/icons';
import { Location } from 'src/entities/profile/types/profileSummary';

type LocationFormProps = {
  locations?: Location[];
};

export const LocationForm = ({ locations = [] }: LocationFormProps) => {
  const [selectedMainLocation, setSelectedMainLocation] = useState<Location>(locations[0]);

  return (
    <section>
      <div className={styles.Wrapper}>
        <ul className={styles.MainCategoryColumn}>
          {locations.map((location) => (
            <li
              key={location.name}
              className={`${styles.Category} ${styles.MainCategory}`}
              role={'option'}
              aria-selected={selectedMainLocation === location}
              onClick={() => setSelectedMainLocation(location)}
            >
              {location.name}
            </li>
          ))}
        </ul>
        <ul>
          {selectedMainLocation?.subLocations?.map((location) => (
            <li key={location.name} className={`${styles.Category} ${styles.SubCategory}`}>
              {location.name}
              <Plus className={styles.Icon} width={16} height={16} color={'#cdcace'} />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};
