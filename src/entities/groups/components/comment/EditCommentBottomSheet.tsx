import { BottomSheet } from 'src/shared/ui/BottomSheet/BottomSheet';
import { Button } from 'src/shared/ui/Button/Button';
import { Input } from 'src/shared/ui/Input/Input';
import styles from './EditCommentBottomSheet.module.css';
import { Spacing } from 'src/shared/ui/Spacing/Spacing';
import { useMutation } from '@tanstack/react-query';
import { updateGroupInfoComment } from 'src/types';
import { useState } from 'react';
import toast from 'react-hot-toast';

type EditCommentBottomSheetProps = {
  isOpen: boolean;
  groupId: string;
  infoId: string;
  initialComment: string;
  onClose: () => void;
};

export const EditCommentBottomSheet = ({
  isOpen,
  groupId,
  infoId,
  initialComment,
  onClose,
}: EditCommentBottomSheetProps) => {
  const [comment, setComment] = useState(initialComment);

  const { mutate, isPending } = useMutation({
    mutationFn: (comment: string) => updateGroupInfoComment(groupId, infoId, { message: comment }),
    onSuccess: () => {
      toast('코멘트를 수정했어요');
      onClose();
    },
  });

  const handleEdit = () => {
    mutate(comment);
  };

  const handleDelete = () => {
    mutate('');
  };

  return (
    <BottomSheet isOpen={isOpen} onClose={onClose} detent={'content-height'}>
      <BottomSheet.Content>
        <div className={styles.Header}>
          <Spacing size={24} />
          <span className={styles.Title}>코멘트 수정</span>
          <Button
            className={styles.DeleteCommentButton}
            disabled={isPending}
            onClick={handleDelete}
            variant={'ghost'}
            size={'fit'}
          >
            삭제
          </Button>
        </div>
        <Input
          className={styles.Input}
          value={comment}
          onChange={(e) => setComment(e.target.value.trim())}
          shape={'box'}
          placeholder={'후보자에 대한 코멘트를 입력해주세요.'}
          suffixSlot={<span className={styles.Count}>{`${comment.length}/20`}</span>}
        />
        <Button disabled={isPending} onClick={handleEdit}>
          변경사항 저장
        </Button>
      </BottomSheet.Content>
    </BottomSheet>
  );
};
