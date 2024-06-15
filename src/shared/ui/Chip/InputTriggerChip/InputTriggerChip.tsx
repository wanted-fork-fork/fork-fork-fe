import { Chip } from 'src/shared/ui/Chip/Chip';
import { Plus } from 'src/shared/ui/icons';
import styles from './InputTriggerChip.module.css';

type InputTriggerChipProps = {
  onClick: () => void;
};

export const InputTriggerChip = ({ onClick }: InputTriggerChipProps) => {
  return (
    <Chip onClick={onClick}>
      <div className={styles.Wrapper}>
        <Plus width={16} height={16} color={'#cdcace'} />
        직접 추가하기
      </div>
    </Chip>
  );
};
