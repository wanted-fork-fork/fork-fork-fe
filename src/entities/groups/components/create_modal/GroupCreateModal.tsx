import { ChangeEvent, useState } from 'react';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { Input } from 'src/shared/ui/Input/Input';
import { iconList } from 'src/entities/groups/mocks/groupInfoMock';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import styles from './GroupCreateModal.module.css';
import { Button } from 'src/shared/ui/Button/Button';

export const GroupCreateModal = ({
  isOpen,
  onClose,
  onSubmit,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, icon: string) => void;
}) => {
  const [name, setName] = useState('');
  const [selectedIcon, setIcon] = useState(iconList[0]);

  const handleChangeName = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value.length > 10) {
      setName(value.slice(0, 10));
      return;
    }

    setName(value);
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} detent={'content-height'}>
      <BottomSheet.Header>
        <span className={styles.Header}>그룹 생성</span>
      </BottomSheet.Header>
      <BottomSheet.Content>
        <form className={styles.Form} onSubmit={(e) => e.preventDefault()}>
          <label className={styles.Label}>
            그룹명
            <Input
              shape={'box'}
              placeholder={'그룹명을 입력해주세요.'}
              suffixSlot={<span className={styles.Count}>{name.length ?? 0}/10</span>}
              value={name}
              onChange={handleChangeName}
            />
          </label>
          <label className={styles.Label}>
            대표 아이콘
            <div className={styles.RadioList} role={'radiogroup'}>
              {iconList.map((icon) => (
                <Avatar
                  className={styles.Thumbnail}
                  key={icon}
                  role={'radio'}
                  fallback={''}
                  shape={'circle'}
                  src={icon}
                  aria-checked={selectedIcon === icon}
                  onClick={() => setIcon(icon)}
                />
              ))}
            </div>
          </label>
          <Button type={'submit'} disabled={name.length === 0} onClick={() => onSubmit(name, selectedIcon)}>
            그룹 만들기
          </Button>
        </form>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
