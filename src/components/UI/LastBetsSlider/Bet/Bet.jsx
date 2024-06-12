import styles from './Bet.module.scss';

export const Bet = ({ bet }) => {
  return (
    <div className={styles.bet}>
      <span>
        {bet}
        x
      </span>
    </div>
  );
};
