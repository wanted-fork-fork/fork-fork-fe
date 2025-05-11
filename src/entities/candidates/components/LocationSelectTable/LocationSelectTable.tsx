import styles from 'src/entities/candidates/components/LocationSelectTable/LocationSelectTable.module.css';
import { Minus, Plus } from 'src/shared/ui/icons';
import { useState } from 'react';
import { Location } from 'src/entities/candidates/vo/location/types/location';
import { ScrollView } from 'src/shared/ui/ScrollView/ScrollView';
import { Theme } from 'src/shared/styles/constants';
import { locationListMock } from 'src/entities/candidates/vo/location/mocks/location.mock';

type Props = {
  selectedLocations: Location[];
  selectLocation: (loc: Location) => void;
};

const locations = locationListMock;

export const LocationSelectTable = ({ selectedLocations, selectLocation }: Props) => {
  const [selectedMainLocation, setSelectedMainLocation] = useState<Location>(locations[0]);

  return (
    <div className={styles.Wrapper}>
      <ScrollView>
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
      </ScrollView>
      <ScrollView rootClassName={styles.SubCategoryScrollRoot} key={selectedMainLocation.city.cityName}>
        <ul className={styles.SubCategoryColumn}>
          {selectedMainLocation.town.map((town) => (
            <li
              key={town.townName}
              className={`${styles.Category} ${styles.SubCategory}`}
              onClick={() => selectLocation({ city: selectedMainLocation.city, town: [town] })}
            >
              {town.townName}
              {selectedLocations.some(({ town: selectedTown }) => selectedTown[0].town === town.town) ? (
                <Minus className={styles.Icon} width={16} height={16} color={Theme.color.neutral30} />
              ) : (
                <Plus className={styles.Icon} width={16} height={16} color={Theme.color.neutral30} />
              )}
            </li>
          ))}
        </ul>
      </ScrollView>
    </div>
  );
};
