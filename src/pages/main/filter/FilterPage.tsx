import { FormLayout } from 'src/pages/layout/FormLayout';
import { useNavigate } from '@remix-run/react';
import { Button } from 'src/shared/ui/Button/Button';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { useBoolean } from 'src/shared/functions/useBoolean';
import { ArrowDown, Search } from 'src/shared/ui/icons';
import { Chip } from 'src/shared/ui/Chip/Chip';
import styles from './FilterPage.module.css';
import { Theme } from 'src/shared/styles/constants';
import Flex from 'src/shared/ui/Flex/Flex';
import { Menu } from 'src/shared/ui/Menu/Menu';
import { SearchInfoRequestDtoGender, SearchInfoRequestDtoSortBy, SearchInfoRequestDtoSortDirection } from 'src/types';
import { useRemixForm } from 'remix-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { LocationSelectTable } from 'src/entities/candidates/_common/components/LocationSelectTable/LocationSelectTable';
import { useMultiSelectToggle } from 'src/shared/functions/useMultiSelectToggle';
import { Location } from 'src/entities/candidates/_common/vo/location/types/location';
import { getLocationText } from 'src/entities/candidates/info/utils/getLocationText';
import { useTranslation } from 'react-i18next';

const genderList: { name: string; gender: SearchInfoRequestDtoGender | undefined }[] = [
  { name: '전체', gender: undefined },
  { name: '남자', gender: 'MALE' },
  { name: '여자', gender: 'FEMALE' },
];
const alignList: {
  name: string;
  sortBy: SearchInfoRequestDtoSortBy;
  sortDirection: SearchInfoRequestDtoSortDirection;
}[] = [
  { name: '오래된 등록 순', sortBy: 'CREATED_DATE', sortDirection: 'ASC' },
  { name: '최신 등록 순', sortBy: 'CREATED_DATE', sortDirection: 'DESC' },
  { name: '이름 내림차순', sortBy: 'NAME', sortDirection: 'DESC' },
  { name: '이름 오름차순', sortBy: 'NAME', sortDirection: 'ASC' },
];

const schema = z.object({
  sortBy: z.enum(['CREATED_DATE', 'NAME'] as const satisfies SearchInfoRequestDtoSortBy[]),
  sortDirection: z.enum(['ASC', 'DESC'] as const satisfies SearchInfoRequestDtoSortDirection[]),
  gender: z.enum(['MALE', 'FEMALE'] as const satisfies SearchInfoRequestDtoGender[]).optional(),
  ageFrom: z.number().min(1).optional(),
  ageTo: z.number().max(100).optional(),
  heightFrom: z.number().min(100).optional(),
  heightTo: z.number().max(200).optional(),
  townList: z.array(z.string()),
});

type FormData = z.infer<typeof schema>;

const resolver = zodResolver(schema);

export const FilterPage = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const { value: showAlignBottomSheet, setTrue: openAlign, setFalse: closeAlign } = useBoolean(false);
  const { value: showLocationBottomSheet, setTrue: openLocation, setFalse: closeLocation } = useBoolean(false);

  const { watch, register, setValue } = useRemixForm<FormData>({ mode: 'onBlur', resolver });

  const submitEnabled = true;
  const resetEnabled = true;

  const [selectedAlign, setSelectedAlign] = useState(alignList[0]);
  const { list, toggle } = useMultiSelectToggle<Location>([], (a, b) => a.town[0].town === b.town[0].town);

  const handleSelectAlign = ({ sortBy, sortDirection }: (typeof alignList)[number], idx: number) => {
    setValue('sortBy', sortBy);
    setValue('sortDirection', sortDirection);
    setSelectedAlign(alignList[idx]);
  };

  const handleReset = () => {};
  const handleSubmit = () => {};

  return (
    <>
      <FormLayout.Container>
        <FormLayout.Header onPrev={() => navigate('/')}>정렬조건 및 필터</FormLayout.Header>
        <FormLayout.Body className={styles.Body}>
          <div className={styles.Row}>
            <h3>정렬조건</h3>
            <button className={styles.SelectButton} onClick={openAlign}>
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
              {genderList.map(({ name, gender }) => (
                <Chip
                  key={name}
                  className={styles.Chip}
                  selected={watch('gender') === gender}
                  onClick={() => setValue('gender', gender)}
                >
                  {name}
                </Chip>
              ))}
            </Flex>
          </div>
          <div className={styles.Row}>
            <Flex direction={'horizontal'} justify={'between'}>
              <h4>키(cm)</h4>
              <span className={styles.RangeDescription}>170cm 이상</span>
            </Flex>
            <div className={styles.RangeInput}>
              <input className={styles.Input} placeholder={'최소'} {...register('heightFrom')} />
              <span>-</span>
              <input className={styles.Input} placeholder={'최고'} {...register('heightTo')} />
            </div>
            <p className={styles.Error}>최소값보다 큰 숫자를 입력해주세요.</p>
          </div>
          <div className={styles.Row}>
            <Flex direction={'horizontal'} justify={'between'}>
              <h4>나이(만)</h4>
              <span className={styles.RangeDescription}>170cm 이상 180cm 이하</span>
            </Flex>
            <div className={styles.RangeInput}>
              <input className={styles.Input} placeholder={'최소'} {...register('ageFrom')} />
              <span>-</span>
              <input className={styles.Input} placeholder={'최고'} {...register('ageTo')} />
            </div>
            <p className={styles.Error}>최소값보다 큰 숫자를 입력해주세요.</p>
          </div>
          <div className={styles.Row}>
            <h4>지역</h4>
            <button className={`${styles.SelectButton} ${styles.Gray}`} onClick={openLocation}>
              <span>지역 찾기</span>
              <Search color={Theme.color.neutral30} />
            </button>
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
          <Button widthType={'fill'} type={'submit'} color={'primary'} disabled={!submitEnabled} onClick={handleSubmit}>
            적용
          </Button>
        </FormLayout.Footer>
      </FormLayout.Container>
      {/* 정렬 조건 */}
      <BottomSheet detent={'content-height'} isOpen={showAlignBottomSheet} onClose={closeAlign}>
        <BottomSheet.Content className={styles.AlignSheetContent}>
          {alignList.map((align, idx) => (
            <Menu
              key={align.name}
              name={align.name}
              selected={selectedAlign.name === align.name}
              onClick={() => {
                handleSelectAlign(align, idx);
                closeAlign();
              }}
            />
          ))}
        </BottomSheet.Content>
      </BottomSheet>
      {/* 지역 선택 */}
      <BottomSheet detent={'content-height'} isOpen={showLocationBottomSheet} onClose={closeLocation}>
        <BottomSheet.Content className={styles.LocationSheetContent}>
          <h3>지역을 선택해주세요.</h3>
          <Flex direction={'horizontal'} justify={'start'} gap={4} overflowX={'auto'}>
            {list.map((loc) => (
              <Chip key={loc.town[0].town}>{getLocationText(loc, t)}</Chip>
            ))}
          </Flex>
          <LocationSelectTable selectedLocations={list} selectLocation={toggle} />
          <div className={styles.Footer}>
            <Button widthType={'fill'}>선택 완료</Button>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
