import styles from './CompletePage.module.css';

export const CompletePage = () => {
  return (
    <div className={styles.Wrapper}>
      <h2 className={styles.TitleSection}>
        정보를 입력해주셔서 감사합니다!
        <br />
        제가 꼭 좋은 소식 전해드릴게요!
      </h2>
      <img className={styles.Image} src={'/images/googoo_3.png'} alt={'인사하는 구구'} />
    </div>
  );
};
