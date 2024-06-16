import { Footer, LastBetsSlider, GameItem } from '../../components';
import styles from './HomePage.module.scss';

export const HomePage = () => {
  return (
    <section className={styles.home}>
      <div className={styles.home__main}>
        <LastBetsSlider />

        <GameItem />
      </div>
      <Footer />
    </section>
  );
};
