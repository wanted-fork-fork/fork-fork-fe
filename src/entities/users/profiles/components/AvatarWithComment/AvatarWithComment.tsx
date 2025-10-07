import { Avatar } from "src/shared/ui/Avatar/Avatar";
import Flex from "src/shared/ui/Flex/Flex";
import { MessageBoxTail } from "src/shared/ui/icons";
import styles from "./AvatarWithComment.module.css";

export const AvatarWithComment = ({
  creatorImg,
  creatorName,
  comment,
  theme = 'white',
}: {
  creatorImg: string;
  creatorName: string;
  comment: string;
  theme?: 'white' | 'gray';
}) => {
  return <Flex className={styles.Container} direction="horizontal" gap={8} align="start">
    <Avatar src={creatorImg || '/images/default_profile.png'} fallback={creatorName} shape="circle" alt={creatorName} size={32} />
    <Flex direction="vertical" gap={8} align="start" className={styles.CommentContainer} data-theme={theme}>
      <p className={styles.CreatorName}>{creatorName}</p>
      <Flex direction="horizontal" align="start">
        <MessageBoxTail />
        <div className={styles.Comment}>
          {comment}
        </div>
      </Flex>
    </Flex>
  </Flex>;
};