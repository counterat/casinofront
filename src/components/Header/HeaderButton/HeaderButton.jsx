import styles from './HeaderButton.module.scss';

export const HeaderButton = ({ icon, onClick }) => {
  return (
    <button className={styles['icon-button']} onClick={onClick}>
      {icon}
    </button>
  );
};
