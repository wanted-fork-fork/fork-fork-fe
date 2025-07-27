import { DetailedHTMLProps, ImgHTMLAttributes, ReactNode } from 'react';
import styles from './Avatar.module.css';
import { useImageLoadingStatus } from 'src/shared/functions/useImageLoadingStatus';

export type AvatarProp = DetailedHTMLProps<ImgHTMLAttributes<HTMLImageElement>, HTMLImageElement> & {
  fallback: ReactNode;
  shape: 'circle' | 'roundedSquare';
  size?: number;
  actionSlot?: ReactNode;
  onClick?: () => void;
};

export const Avatar = ({ className = '', actionSlot, shape, size, alt, fallback, onClick, ...props }: AvatarProp) => {
  const loadingStatus = useImageLoadingStatus(props.src);

  return (
    <>
      <div
        className={`${styles.Container} ${className}`}
        role={onClick ? 'button' : undefined}
        style={size ? { '--size': size } : undefined}
        data-shape={shape}
        data-loading={loadingStatus === 'loading'}
        draggable={false}
        onClick={onClick}
        onKeyDown={onClick}
      >
        {loadingStatus === 'success' && (
          <img className={styles.Image} alt={alt ?? '이미지'} data-loading={false} {...props} />
        )}
        {loadingStatus === 'error' && <span className={styles.Fallback}>{fallback}</span>}
        {actionSlot && (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events,jsx-a11y/no-static-element-interactions
          <span className={styles.ActionSlot} onClick={(e) => e.stopPropagation()}>
            {actionSlot}
          </span>
        )}
      </div>
    </>
  );
};
