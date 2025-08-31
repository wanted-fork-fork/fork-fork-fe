import { ChangeEvent, useState } from 'react';
import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { Input } from 'src/shared/ui/Input/Input';
import { iconList } from 'src/entities/groups/mocks/groupInfoMock';
import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import styles from './GroupCreateModal.module.css';
import { Button } from 'src/shared/ui/Button/Button';
import { CreateGroupRequestIcon } from 'src/types';

export const GroupCreateModal = ({
  isOpen,
  onClose,
  onSubmit,
  initialData = {},
  edit = false,
  isPending = false,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, icon: CreateGroupRequestIcon) => void;
  initialData?: { name?: string; icon?: CreateGroupRequestIcon };
  edit?: boolean;
  isPending?: boolean;
}) => {
  const [name, setName] = useState(initialData.name ?? '');
  const [selectedIcon, setIcon] = useState<CreateGroupRequestIcon>(initialData.icon ?? iconList[0][0]);

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
        <span className={styles.Header}>{edit ? '그룹 정보 수정' : '그룹 생성'}</span>
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
              {iconList.map(([value, img]) => (
                <Avatar
                  className={styles.Thumbnail}
                  key={value}
                  role={'radio'}
                  fallback={''}
                  shape={'circle'}
                  src={img}
                  aria-checked={selectedIcon === value}
                  onClick={() => setIcon(value)}
                />
              ))}
            </div>
          </label>
          <Button
            type={'submit'}
            disabled={isPending || name.length === 0}
            onClick={() => onSubmit(name, selectedIcon)}
          >
            {edit ? '변경사항 저장' : '그룹 만들기'}
          </Button>
        </form>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
