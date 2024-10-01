import styles from './ImageLayout.module.css';

export const ImageLayout = ({ urls }: { urls: string[] }) => {
  return (
    <div className={styles.ImageLayout} data-itemcount={Math.min(urls.length, 5)}>
      {urls.slice(0, 8).map((url) => (
        <img key={url} src={url} alt={'프로필 이미지'} />
      ))}
    </div>
  );
};
