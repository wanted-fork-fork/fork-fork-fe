import styles from './HeightStyleForm.module.css';
import { useIdlePartnerStore } from 'src/entities/ideal_partner/model/idealPartnerStore';
import { RangeSlider } from 'src/shared/ui/RangeSlider/RangeSlider';
import { Input } from 'src/shared/ui/Input/Input';
import { AvatarList } from 'src/shared/ui/AvatarList/AvatarList';

const MIN_HEIGHT = 100;
const MAX_HEIGHT = 240;

export const HeightStyleForm = () => {
  const { min, max } = useIdlePartnerStore((state) => state.heightRange);
  const style = useIdlePartnerStore((state) => state.style);
  const files = useIdlePartnerStore((state) => state.images);

  const setMin = useIdlePartnerStore((state) => state.setMinHeight);
  const setMax = useIdlePartnerStore((state) => state.setMaxHeight);
  const setStyle = useIdlePartnerStore((state) => state.setStyle);
  const setFiles = useIdlePartnerStore((state) => state.setImages);

  const onChange = ([min, max]: [number, number]) => {
    setMin(min);
    setMax(max);
  };

  return (
    <section className={styles.Container}>
      <RangeSlider
        min={MIN_HEIGHT}
        max={MAX_HEIGHT}
        minLabel={`${min}cm`}
        maxLabel={`${max}cm`}
        step={1}
        defaultValue={[min, max]}
        disabled={false}
        onChanged={onChange}
      />
      <label>
        선호하는 스타일
        <Input
          placeholder={'ex. 눈이 크신 분, 안경이 잘 어울리시는 분'}
          value={style}
          onChange={(e) => setStyle(e.target.value)}
        />
      </label>
      <div>
        <small>이상형 참고사진</small>
        <AvatarList files={files} setFiles={setFiles} />
      </div>
    </section>
  );
};
