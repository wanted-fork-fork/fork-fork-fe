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
            <button className={styles.SelectButton}>
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
              {['전체', '남자', '여자'].map((value) => (
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
          </div>
          <div className={styles.Row}>
            <h4>지역</h4>
            <button className={`${styles.SelectButton} ${styles.Gray}`}>
              <span>지역 찾기</span>
              <Search color={Theme.color.neutral30} />
            </button>
          </div>
        </FormLayout.Body>
        <FormLayout.Footer>
          <Button type={'reset'} color={'neutral'} disabled={resetEnabled} onClick={handleReset}>
            초기화
          </Button>
          <Button type={'submit'} color={'primary'} disabled={submitEnabled} onClick={handleSubmit}>
            적용
          </Button>
        </FormLayout.Footer>
      </FormLayout.Container>
      {/* 정렬 조건 */}
      <BottomSheet isOpen={showAlignBottomSheet} onClose={closeAlign}>
        dd
      </BottomSheet>
      {/* 지역 선택 */}
      <BottomSheet isOpen={showLocationBottomSheet} onClose={closeLocation}>
        dd
      </BottomSheet>
    </>
  );
};
