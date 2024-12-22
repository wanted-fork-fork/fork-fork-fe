import styles from './HeightStyleForm.module.css';
import {
  useIdealPartnerImages,
  useIdealPartnerStore,
  useRemoveIdealPartnerImageDto,
} from 'src/entities/ideal_partner/model/idealPartnerStore';
import { Input } from 'src/shared/ui/Input/Input';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';
import { Radio } from 'src/shared/ui/Radio/Radio';
import { ChangeEvent, useState } from 'react';

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
    if (!isNaN(value)) setMin(value);
  };
  const onChangeMax = (e: ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) setMax(value);
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
          <div className={styles.HeightInputWrapper}>
            <p className={styles.Description}>그렇다면 선호하는 키와 스타일을 알려주세요</p>
            <p className={'label'}>키</p>
            <div className={styles.HeightInput}>
              <Input placeholder={'최소 키 입력'} suffixSlot={<span>cm</span>} value={min} onChange={onChangeMin} />
              <span>-</span>
              <Input placeholder={'최대 키 입력'} suffixSlot={<span>cm</span>} value={max} onChange={onChangeMax} />
            </div>
          </div>
          <label className={styles.StyleInputWrapper}>
            선호하는 스타일
            <Input
              placeholder={'ex. 눈이 크신 분, 안경이 잘 어울리시는 분'}
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            />
          </label>
          <div>
            <div className={styles.PictureLabelContainer}>
              <p className={'label'}>이상형 참고사진</p>
              <p className={styles.PictureLabelDescription}>사진은 최대 10장까지 올릴 수 있어요.</p>
            </div>
            <AvatarList
              imageDtoList={imageDtoList}
              setFiles={setFiles}
              maxFileCount={10}
              onClickRemove={removeImageDto}
            />
          </div>
        </div>
      )}
    </section>
  );
};
