import styles from './Screensaver.module.scss';

export const Screensaver = () => {
  return (
    <section className={styles.screensaver}>
      <div className={styles.screensaver__loader}></div>
    </section>
  );
};
