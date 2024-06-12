

import styles from './Avatar.module.scss';

export const Avatar = ({user}) => {
  const dateString = user.created_at;

// Создание объекта Date из исходной строки
const date = new Date(dateString);

// Получение компонентов даты (день, месяц, год)
const day = date.getDate();
const month = date.getMonth() + 1; // Месяцы в JavaScript начинаются с 0, поэтому добавляем 1
const year = date.getFullYear();

// Форматирование даты в нужный формат (добавляем ведущие нули)
const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${year}`;

  return (
    <div className={styles.avatar}>
      {user.photo_of_user_url ?
        (<img src={user.photo_of_user_url} alt="avatar" className={styles.avatar__foto} />)
        : (<div className={styles.avatar__foto} />)
      }

      <div className={styles.avatar__info}>
        <h4 className={styles.avatar__name}>{user.username}</h4>

        <p className={styles.avatar__date}>
          <span>Дата регистрации:</span>
          <span>{formattedDate}</span>
        </p>
      </div>
    </div>
  );
};
