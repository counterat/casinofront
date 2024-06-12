import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

import styles from './RefillForm.module.scss';

import InfoIcon from '../../assets/icons/info-grey.svg?react';
import { CURRENCY } from '../../utils/constants';

export const RefillForm = () => {
  const formSubmitHandler = () => {};

  return (
    <form
      className={styles.form}
      onSubmit={() => formSubmitHandler()}
    >
      <h5 className={styles.form__subheader}>
        <InfoIcon className={styles.form__icon} />
        Mинимальная сумма депозита 5$
      </h5>

      <label
        htmlFor="amount"
        className={styles.form__label}
      >
        Сумма пополнения в $
      </label>

      <div className={styles['form__input-wrapper']}>
        <input
          className={styles.form__input}
          id="amount"
          type="text"
          placeholder='0'
        />
      </div>

      <label
        htmlFor="currency"
        className={styles.form__label}
      >
        Валюта
      </label>

      <Autocomplete
        disablePortal
        id="currency"
        className={styles.form__autocomplete}
        options={CURRENCY}
        sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="" />}
      />

    </form>
  );
};

