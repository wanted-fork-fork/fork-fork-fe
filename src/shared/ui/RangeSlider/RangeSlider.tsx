import _RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';
import styles from './RangeSlider.module.css';

type RangeSliderProps = {
  min: number;
  max: number;
  minLabel: string;
  maxLabel: string;
  step: number;
  defaultValue: [number, number];
  disabled: boolean;
  onChanged: (values: [number, number]) => void;
};

export const RangeSlider = ({
  min,
  max,
  step,
  defaultValue,
  minLabel,
  maxLabel,
  disabled,
  onChanged,
}: RangeSliderProps) => {
  return (
    <div>
      <div className={styles.LabelContainer}>
        <span>{minLabel}</span>
        <span>{maxLabel}</span>
      </div>
      <_RangeSlider
        className={styles.Slider}
        min={min}
        max={max}
        step={step}
        defaultValue={defaultValue}
        disabled={disabled}
        onInput={onChanged}
        rangeSlideDisabled
      />
    </div>
  );
};
