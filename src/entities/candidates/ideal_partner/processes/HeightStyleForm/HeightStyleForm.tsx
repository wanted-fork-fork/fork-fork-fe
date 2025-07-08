import styles from 'src/entities/candidates/ideal_partner/processes/HeightStyleForm/HeightStyleForm.module.css';
import { Input } from 'src/shared/ui/Input/Input';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';
import { Radio } from 'src/shared/ui/Radio/Radio';
import { ChangeEvent, useState } from 'react';
import {
  useIdealPartnerImages,
  useIdealPartnerStore,
  useRemoveIdealPartnerImageDto,
} from 'src/entities/candidates/ideal_partner/models/idealPartnerStore';
import { Accordion } from 'src/shared/ui/Accordion/Accordion';
import Flex from 'src/shared/ui/Flex/Flex';
import { getRangeText } from 'src/shared/functions/string';

export const HeightStyleForm = () => {
  const idealHeight = useIdealPartnerStore((state) => state.heightRange);
  const style = useIdealPartnerStore((state) => state.style);
  const imageDtoList = useIdealPartnerImages();
  const removeImageDto = useRemoveIdealPartnerImageDto();

  const { min, max } = idealHeight ?? { min: undefined, max: undefined };

  const [enabled, setEnabled] = useState(() => Boolean(idealHeight || style || imageDtoList.length));

  const setMin = useIdealPartnerStore((state) => state.setMinHeight);
  const setMax = useIdealPartnerStore((state) => state.setMaxHeight);
  const toggleHeight = useIdealPartnerStore((state) => state.toggleHeight);
  const setStyle = useIdealPartnerStore((state) => state.setStyle);
  const setFiles = useIdealPartnerStore((state) => state.setImages);

  const onChangeMin = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= 0 || isNaN(value)) {
      setMin(undefined);
    } else if (value >= 240) {
      setMin(240);
    } else {
      setMin(value);
    }
  };
  const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value <= 0 || isNaN(value)) {
      setMax(undefined);
    } else if (value >= 240) {
      setMax(240);
    } else {
      setMax(value);
    }
  };

  const onCheckDisable = () => {
    setStyle('');
    setFiles(() => []);
    toggleHeight(false);
    setEnabled(false);
  };

  const onCheckEnabled = () => {
    toggleHeight(true);
    setEnabled(true);
  };

  return (
    <section>
      <div>
        <Radio label={'상관 없어요'} checked={!enabled} onChange={onCheckDisable} />
        <Radio label={'중요해요'} checked={enabled} onChange={onCheckEnabled} />
      </div>
      {enabled && (
        <div className={styles.Container}>
          <p className={styles.Description}>주선자가 꼭 알아야 하는 사항을 입력해주세요.</p>
          <Accordion
            summary={
              <Flex className={styles.AccordionWithPostfix} justify={'between'} align={'center'}>
                <p>선호하는 키</p>
                <span className={styles.Postfix}>
                  {getRangeText(
                    { min, max },
                    { unit: 'cm', infix: '이상', suffix: '이하', singlePostfix: { min: '이상', max: '이하' } },
                  )}
                </span>
              </Flex>
            }
            summaryClassName={styles.AccordionSummary}
          >
            <div className={styles.HeightInput}>
              <Input
                shape={'box'}
                placeholder={'최소'}
                value={min ?? ''}
                onChange={onChangeMin}
                inputMode={'numeric'}
              />
              <span>-</span>
              <Input
                shape={'box'}
                placeholder={'최대'}
                value={max ?? ''}
                onChange={onChangeMax}
                inputMode={'numeric'}
              />
            </div>
            {Boolean(min && max && min >= max) && <p className={styles.Error}>최솟값보다 큰 값을 입력해주세요.</p>}
          </Accordion>
          <Accordion
            summary={
              <Flex className={styles.AccordionWithPostfix} justify={'between'} align={'center'}>
                <span>좋아하는 스타일</span>
              </Flex>
            }
            summaryClassName={styles.AccordionSummary}
          >
            <Input
              shape={'box'}
              placeholder={'ex. 눈이 크신 분, 안경이 잘 어울리시는 분'}
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
          </Accordion>
          <Accordion summary={'이상형 참고 사진'} summaryClassName={styles.AccordionSummary}>
            <p className={styles.PictureLabelDescription}>사진은 최대 10장까지 올릴 수 있어요.</p>
            <AvatarList
              imageDtoList={imageDtoList}
              setFiles={setFiles}
              maxFileCount={10}
              onClickRemove={removeImageDto}
            />
          </Accordion>
        </div>
      )}
    </section>
  );
};
