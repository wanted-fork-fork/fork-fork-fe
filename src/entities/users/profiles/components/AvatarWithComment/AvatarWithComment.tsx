import { Avatar } from "src/shared/ui/Avatar/Avatar";
import Flex from "src/shared/ui/Flex/Flex";
import { MessageBoxTail } from "src/shared/ui/icons";
import styles from "./AvatarWithComment.module.css";
import { Theme } from "src/shared/styles/constants";

export const AvatarWithComment = ({
  creatorImg,
  creatorName,
  comment,
}: {
  creatorImg: string;
  creatorName: string;
  comment: string;
}) => {
  return <Flex direction="horizontal" gap={8} align="start">
    <Avatar src={creatorImg} fallback={creatorName} shape="circle" alt={creatorName} size={32} />
    <Flex direction="vertical" gap={8} align="start">
      <p className={styles.CreatorName}>{creatorName}</p>
      <Flex direction="horizontal" align="start">
        <MessageBoxTail color={Theme.color.neutral0} />
        <div className={styles.Comment}>
          {comment}
        </div>
      </Flex>
    </Flex>
  </Flex>;
};