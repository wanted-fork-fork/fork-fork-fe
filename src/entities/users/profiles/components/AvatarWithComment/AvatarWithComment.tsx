import { Avatar } from 'src/shared/ui/Avatar/Avatar';
import Flex from 'src/shared/ui/Flex/Flex';
import { Edit, MessageBoxTail } from 'src/shared/ui/icons';
import styles from './AvatarWithComment.module.css';
import { Theme } from 'src/shared/styles/constants';

export const AvatarWithComment = ({
  creatorImg,
  creatorName,
  comment,
  theme = 'white',
  onClickEdit,
}: {
  creatorImg: string;
  creatorName: string;
  comment: string;
  theme?: 'white' | 'gray';
  onClickEdit?: () => void;
}) => {
  return (
    <Flex className={styles.Container} direction="horizontal" gap={8} align={comment.length > 0 ? 'start' : 'center'}>
      <Avatar
        src={creatorImg || '/images/default_profile.png'}
        fallback={creatorName}
        shape="circle"
        alt={creatorName}
        size={32}
      />
      <Flex direction="vertical" gap={8} align={'start'} className={styles.CommentContainer} data-theme={theme}>
        <Flex direction={'horizontal'} gap={8} align={'center'} justify={'start'}>
          <p className={styles.CreatorName}>{creatorName}</p>
          {!comment && onClickEdit && (
            <button className={styles.EditButton} onClick={onClickEdit}>
              <Edit width={16} height={16} color={Theme.color.neutral30} />
            </button>
          )}
        </Flex>
        {comment && (
          <Flex direction="horizontal" align="start">
            <MessageBoxTail />
            <div className={styles.Comment}>
              {comment}
              {onClickEdit && (
                <button className={styles.EditButton} onClick={onClickEdit}>
                  <Edit width={16} height={16} color={Theme.color.neutral30} />
                </button>
              )}
            </div>
          </Flex>
        )}
      </Flex>
    </Flex>
  );
};
