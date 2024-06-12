import styles from './UserSliderItem.module.scss';

export const UserSliderItem = ({ user }) => {
  return (
    <div className={styles.slide}>
      <div className={styles.slide__avatar}>
        {user.avatar_url ?
          (<img src={user.avatar_url} alt="avatar" className={styles.slide__foto} />)
          : (<div className={styles.slide__foto} />)
        }

        <div className={styles.slide__info}>
          <p className={styles.slide__name}>{user.username.slice(0,11)}</p>

          <p className={styles.slide__bet}>
            {user.price}
          </p>
        </div>
      </div>

    </div>
  );
};
