import { FormLayout } from 'src/pages/layout/FormLayout';
import { Form, useNavigate } from '@remix-run/react';
import { Button } from 'src/shared/ui/Button/Button';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { ArrowDown, Close, Search } from 'src/shared/ui/icons';
import { Chip } from 'src/shared/ui/Chip/Chip';
import styles from './FilterPage.module.css';
import { Theme } from 'src/shared/styles/constants';
import Flex from 'src/shared/ui/Flex/Flex';
import { Menu } from 'src/shared/ui/Menu/Menu';
import { useRemixForm } from 'remix-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useMemo } from 'react';
import { LocationSelectTable } from 'src/entities/candidates/_common/components/LocationSelectTable/LocationSelectTable';
import { useMultiSelectToggle } from 'src/shared/functions/useMultiSelectToggle';
import { Location } from 'src/entities/candidates/_common/vo/location/types/location';
import { getLocationText } from 'src/entities/candidates/info/utils/getLocationText';
import { useTranslation } from 'react-i18next';
import {
  FILTER_ALIGN_KEYS,
  filterAlignList,
  filterGenderList,
  filterSchema,
} from 'src/entities/candidates/_common/libs/filter';
import { getRangeText } from 'src/shared/functions/string';
import { SearchInfoRequestDtoGender } from 'src/types';
import { locationListMock } from 'src/entities/candidates/_common/vo/location/mocks/location.mock';

type FormData = z.infer<typeof filterSchema>;

const resolver = zodResolver(filterSchema);

export const FilterPage = ({ initialFilter }: { initialFilter?: FormData }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { value: showAlignBottomSheet, setTrue: openAlign, setFalse: closeAlign } = useBoolean(false);
  const { value: showLocationBottomSheet, setTrue: openLocation, setFalse: closeLocation } = useBoolean(false);

  const {
    handleSubmit,
    watch,
    register,
    setValue,
    reset,
    formState: { isValid, isDirty },
  } = useRemixForm<FormData>({
    mode: 'onSubmit',
    resolver,
    stringifyAllValues: true,
  });

  const initialTownList = useMemo(() => {
    return (
      (initialFilter?.townList
        ?.map((town) => {
          const city = locationListMock.find((city) =>
            city.town.some((t) => {
              return t.town === town;
            }),
          );
          if (!city) return null;
          return { city: city?.city, town: [city.town.find((city) => city.town === town)] } as Location;
        })
        .filter(Boolean) as Location[]) ?? []
    );
  }, [initialFilter?.townList]);

  const { list, toggle } = useMultiSelectToggle<Location>(initialTownList, (a, b) => a.town[0].town === b.town[0].town);

  const alignId = watch('alignId');
  const selectedAlign = useMemo(() => filterAlignList.find((a) => a.id === alignId) ?? filterAlignList[0], [alignId]);

  const heightFrom = watch('heightFrom');
  const heightTo = watch('heightTo');
  const ageFrom = watch('ageFrom');
  const ageTo = watch('ageTo');

  const isValidHeight = useMemo(() => {
    return !(heightFrom && heightTo && Number(heightFrom) > Number(heightTo));
  }, [heightFrom, heightTo]);

  const isValidAge = useMemo(() => {
    return !(ageFrom && ageTo && Number(ageFrom) > Number(ageTo));
  }, [ageFrom, ageTo]);

  const submitEnabled = isValidAge && isValidHeight && isValid;
  const resetEnabled = isDirty;

  const handleSelectAlign = (id: (typeof FILTER_ALIGN_KEYS)[number]) => {
    setValue('alignId', id, { shouldDirty: true });
    closeAlign();
  };

  const handleSelectGender = (gender: SearchInfoRequestDtoGender | undefined) => {
    setValue('gender', gender, { shouldDirty: true });
  };

  const handleCloseLocation = () => {
    closeLocation();
  };

  const handleToggleLocation = (location: Location) => {
    toggle(location);
  };

  const handleReset = () => {
    reset();
  };

  useEffect(() => {
    if (initialFilter) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      Object.entries(initialFilter).forEach(([k, v]) => setValue(k, v, { shouldDirty: true, shouldTouch: true }));
    }
  }, []);

  useEffect(() => {
    setValue(
      'townList',
      list.map((city) => city.town[0].town),
      { shouldDirty: true },
    );
  }, [list]);

  return (
    <>
      <Form style={{ height: '100%' }} method={'POST'} onSubmit={handleSubmit}>
        <FormLayout.Container>
          <FormLayout.Header onPrev={() => navigate('/')}>정렬조건 및 필터</FormLayout.Header>
          <FormLayout.Body className={styles.Body}>
            <div className={styles.Row}>
              <h3>정렬조건</h3>
              <button type={'button'} className={styles.SelectButton} onClick={openAlign}>
                <span>{selectedAlign.name}</span>
                <ArrowDown color={Theme.color.neutral50} />
              </button>
            </div>
            <hr />
            <Flex direction={'horizontal'} justify={'between'}>
              <h3>상세 필터</h3>
              <span className={styles.Description}>후보자 정보에 적용되는 필터입니다.</span>
            </Flex>
            <div className={styles.Row}>
              <h4>성별</h4>
              <Flex justify={'start'} gap={8}>
                {filterGenderList.map(({ name, gender }) => (
                  <Chip
                    key={name}
                    className={styles.Chip}
                    selected={watch('gender') === gender}
                    onClick={() => handleSelectGender(gender)}
                  >
                    {name}
                  </Chip>
                ))}
              </Flex>
            </div>
            <div className={styles.Row}>
              <Flex direction={'horizontal'} justify={'between'}>
                <h4>키(cm)</h4>
                {isValidHeight && (
                  <span className={styles.RangeDescription}>
                    {getRangeText(
                      { min: watch('heightFrom'), max: watch('heightTo') },
                      { unit: 'cm', infix: '이상', suffix: '이하', singlePostfix: { min: '이상', max: '이하' } },
                    )}
                  </span>
                )}
              </Flex>
              <div className={styles.RangeInput}>
                <input
                  className={styles.Input}
                  type={'number'}
                  inputMode={'numeric'}
                  placeholder={'최소'}
                  {...register('heightFrom')}
                />
                <span>-</span>
                <input
                  className={styles.Input}
                  type={'number'}
                  inputMode={'numeric'}
                  placeholder={'최고'}
                  {...register('heightTo')}
                />
              </div>
              {!isValidHeight && <p className={styles.Error}>최소값보다 큰 숫자를 입력해주세요.</p>}
            </div>
            <div className={styles.Row}>
              <Flex direction={'horizontal'} justify={'between'}>
                <h4>나이(만)</h4>
                {isValidAge && (
                  <span className={styles.RangeDescription}>
                    {getRangeText(
                      { min: watch('ageFrom'), max: watch('ageTo') },
                      { unit: '세', infix: '이상', suffix: '이하', singlePostfix: { min: '이상', max: '이하' } },
                    )}
                  </span>
                )}
              </Flex>
              <div className={styles.RangeInput}>
                <input
                  className={styles.Input}
                  type={'number'}
                  inputMode={'numeric'}
                  placeholder={'최소'}
                  {...register('ageFrom')}
                />
                <span>-</span>
                <input
                  className={styles.Input}
                  type={'number'}
                  inputMode={'numeric'}
                  placeholder={'최고'}
                  {...register('ageTo')}
                />
              </div>
              {!isValidAge && <p className={styles.Error}>최소값보다 큰 숫자를 입력해주세요.</p>}
            </div>
            <div className={styles.Row}>
              <h4>지역</h4>
              <button type={'button'} className={`${styles.SelectButton} ${styles.Gray}`} onClick={openLocation}>
                <span>지역 찾기</span>
                <Search color={Theme.color.neutral30} />
              </button>
              <Flex direction={'horizontal'} justify={'start'} gap={4} overflowX={'auto'}>
                {list.map((loc) => (
                  <Chip
                    key={loc.town[0].town}
                    onClick={() => handleToggleLocation(loc)}
                    suffixSlot={<Close width={18} height={18} />}
                  >
                    {getLocationText(loc, t)}
                  </Chip>
                ))}
              </Flex>
            </div>
          </FormLayout.Body>
          <FormLayout.Footer className={styles.Footer}>
            <Button
              widthType={'fill'}
              type={'reset'}
              color={'neutral'}
              variant={'outline'}
              disabled={!resetEnabled}
              onClick={handleReset}
            >
              초기화
            </Button>
            <Button widthType={'fill'} type={'submit'} color={'primary'} disabled={!submitEnabled}>
              적용
            </Button>
          </FormLayout.Footer>
        </FormLayout.Container>
      </Form>
      {/* 정렬 조건 */}
      <BottomSheet detent={'content-height'} isOpen={showAlignBottomSheet} onClose={closeAlign}>
        <BottomSheet.Content className={styles.AlignSheetContent}>
          {filterAlignList.map((align) => (
            <Menu
              key={align.name}
              name={align.name}
              selected={selectedAlign.name === align.name}
              onClick={() => {
                handleSelectAlign(align.id);
              }}
            />
          ))}
        </BottomSheet.Content>
      </BottomSheet>
      {/* 지역 선택 */}
      <BottomSheet detent={'content-height'} isOpen={showLocationBottomSheet} onClose={closeLocation}>
        <BottomSheet.Content className={styles.LocationSheetContent}>
          <h3>지역을 선택해주세요.</h3>
          <Flex direction={'horizontal'} justify={'start'} gap={4} overflowX={'auto'} style={{ flexShrink: 0 }}>
            {list.map((loc) => (
              <Chip
                key={loc.town[0].town}
                onClick={() => handleToggleLocation(loc)}
                suffixSlot={<Close width={18} height={18} />}
              >
                {getLocationText(loc, t)}
              </Chip>
            ))}
          </Flex>
          <LocationSelectTable selectedLocations={list} selectLocation={toggle} />
          <div className={styles.Footer}>
            <Button widthType={'fill'} onClick={handleCloseLocation}>
              선택 완료
            </Button>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
