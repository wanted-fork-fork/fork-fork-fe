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
import { LocationForm } from 'src/entities/candidates/info/processes/LocationForm/LocationForm';

const genderList = ['전체', '남자', '여자'];
const alignList = ['오래된 등록 순', '최신 등록 순', '이름 내림차순', '이름 오름차순'];

export const FilterPage = () => {
  const navigate = useNavigate();

  const { value: showAlignBottomSheet, setTrue: openAlign, setFalse: closeAlign } = useBoolean(false);
  const { value: showLocationBottomSheet, setTrue: openLocation, setFalse: closeLocation } = useBoolean(false);

  const submitEnabled = true;
  const resetEnabled = true;

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
              <span>등록 오래된 순</span>
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
              {genderList.map((value) => (
                <Chip key={value} className={styles.Chip} onClick={console.log}>
                  {value}
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
              <input className={styles.Input} placeholder={'최소'} />
              <span>-</span>
              <input className={styles.Input} placeholder={'최고'} />
            </div>
            <p className={styles.Error}>최소값보다 큰 숫자를 입력해주세요.</p>
          </div>
          <div className={styles.Row}>
            <Flex direction={'horizontal'} justify={'between'}>
              <h4>나이(만)</h4>
              <span className={styles.RangeDescription}>170cm 이상 180cm 이하</span>
            </Flex>
            <div className={styles.RangeInput}>
              <input className={styles.Input} placeholder={'최소'} />
              <span>-</span>
              <input className={styles.Input} placeholder={'최고'} />
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
          {alignList.map((align) => (
            <Menu key={align} name={align} selected={true} onClick={console.log} />
          ))}
        </BottomSheet.Content>
      </BottomSheet>
      {/* 지역 선택 */}
      <BottomSheet detent={'content-height'} isOpen={showLocationBottomSheet} onClose={closeLocation}>
        <BottomSheet.Content className={styles.LocationSheetContent}>
          <h3>지역을 선택해주세요.</h3>
          <LocationForm />
          <div className={styles.Footer}>
            <Button widthType={'fill'}>선택 완료</Button>
          </div>
        </BottomSheet.Content>
      </BottomSheet>
    </>
  );
};
