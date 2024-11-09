import styles from './HeightStyleForm.module.css';
import {
  useIdealPartnerImages,
  useIdealPartnerStore,
  useRemoveIdealPartnerImageDto,
} from 'src/entities/ideal_partner/model/idealPartnerStore';
import { RangeSlider } from 'src/shared/ui/RangeSlider/RangeSlider';
import { Input } from 'src/shared/ui/Input/Input';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';

export const MIN_IDEAL_HEIGHT = 140;
export const MAX_IDEAL_HEIGHT = 200;

export const HeightStyleForm = () => {
  const { min, max } = useIdealPartnerStore((state) => state.heightRange) ?? {
    min: MIN_IDEAL_HEIGHT,
    max: MAX_IDEAL_HEIGHT,
  };
  const style = useIdealPartnerStore((state) => state.style);

  const imageDtoList = useIdealPartnerImages();
  const removeImageDto = useRemoveIdealPartnerImageDto();

  const setMin = useIdealPartnerStore((state) => state.setMinHeight);
  const setMax = useIdealPartnerStore((state) => state.setMaxHeight);
  const setStyle = useIdealPartnerStore((state) => state.setStyle);
  const setFiles = useIdealPartnerStore((state) => state.setImages);

  const onChange = ([min, max]: [number, number]) => {
    setMin(min);
    setMax(max);
  };

  return (
    <section className={styles.Container}>
      <div className={styles.HeightInputWrapper}>
        <p className={'label'}>키</p>
        <RangeSlider
          min={MIN_IDEAL_HEIGHT}
          max={MAX_IDEAL_HEIGHT}
          minLabel={`${min}cm`}
          maxLabel={`${max}cm`}
          step={1}
          defaultValue={[min, max]}
          disabled={false}
          onChanged={onChange}
        />
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
        <AvatarList imageDtoList={imageDtoList} setFiles={setFiles} maxFileCount={10} onClickRemove={removeImageDto} />
      </div>
    </section>
  );
};
