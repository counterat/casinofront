import { useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
// import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import cn from 'classnames';
import 'animate.css';
import { CURRENCIESANDNETWORKS } from '../../../utils/constants';
import { CURRENCY, MESSAGES, NETWORK } from '../../../utils/constants';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import styles from './ModalForm.module.scss';
import { setOnClose } from '../../../utils';
import InfoIcon from '../../../assets/icons/info-grey.svg?react';
import { buttonStyle } from '../../../utils/constants';
export const ModalForm = ({
  setPayoutAmount,
  setCurrencyPayout,
  setNetworkPayout,
  setCurrency,
  setPaymentAmount,
  setAddress, 
  setOnOpen,
  setHasAddress,
  setHasForm,
  subtitle,
  amount,
  buttonTitle,
  sendDataToServer,
  minAmount,
  amountError,
  setIsCloseCurrent,
}) => {

  const [amountInputValue, setAmountInputValue] = useState('');
  const [currencyInputValue, setCurrencyInputValue] = useState('');
  const [networkInputValue, setNetworkInputValue] = useState('');
  var user = useRef();
  user.current = useSelector(state=>state.user.user);
console.log(CURRENCIESANDNETWORKS)
  const [hasAmountInputError, setHasAmountInputError] = useState(false);
  const [hasCurrencyInputError, setHasCurrencyInputError] = useState(false);
  const [hasNetworkInputError, setHasNetworkInputError] = useState(false);
  console.log(user.current)
  const amountInputHandler = (event) => {
    setAmountInputValue(event.target.value);
 
    setHasAmountInputError(false);
    if (buttonTitle == 'Вывод'){
setPayoutAmount(event.target.value)
    }
  };

  const currencyInputHandler = (event, value) => {
    console.log([event, value])
    setCurrencyInputValue(value);
    if (buttonTitle == 'Вывод'){
      setCurrencyPayout(value)
          }
    setHasCurrencyInputError(false);
  };

  const networkInputHandler = (event, value) => {
    if (buttonTitle == 'Вывод'){
      setNetworkPayout(value)
          }
    setNetworkInputValue(value);
    setHasNetworkInputError(false);
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();

    if (
      !!amountInputValue
      && !!currencyInputValue
      && !!networkInputValue
      && Number(amountInputValue) >= minAmount
    ) {
      
if (buttonTitle == 'Пополнить'){
console.log([user.current.id,amountInputValue, currencyInputValue, networkInputValue])

      var response = sendDataToServer(user.current.id,amountInputValue, currencyInputValue, networkInputValue).then((json)=>{
        console.log(json)
        setAddress(json.address)
        setPaymentAmount(json['payer_amount'])
        setCurrency(json['payer_currency'])
      })}
else if (buttonTitle == 'Вывод'){

}
      
  
setOnOpen(setHasAddress);
setOnClose(setIsCloseCurrent, setHasForm);
    }

    setHasAmountInputError( !amountInputValue || Number(amountInputValue) < minAmount);
    setHasCurrencyInputError(!currencyInputValue);
    setHasNetworkInputError(!networkInputValue);
  };

  return (
    <form
      className={styles.form}
      onSubmit={formSubmitHandler}
    >
      <h5 className={styles.form__subheader}>
        <InfoIcon className={styles.form__icon} />
        {subtitle}
      </h5>

      <div className={styles.form__section}>
        <label
          htmlFor="amount"
          className={styles.form__label}
        >
          {amount}
        </label>

        <div className={styles['form__input-wrapper']}>
          <input
            className={styles.form__input}
            id="amount"
            type="number"
            placeholder='0'
            value={amountInputValue}
            onChange={amountInputHandler}
          />
        </div>

        {hasAmountInputError && (<p className={cn(
          'animate__animated',
          'animate__fadeInLeft',
          { [styles.error__message]: hasAmountInputError }
          )}>
          {amountError}
        </p>)}
      </div>

      <div className={styles.form__section}>
        <label
          htmlFor="currency"
          className={styles.form__label}
        >
          Валюта
        </label>

        <Autocomplete
          disablePortal
          id="currency"
          clearIcon={null}
          className={styles.form__autocomplete}
          options={Object.keys(CURRENCIESANDNETWORKS)}
          sx={{ width: 300 }}
          // PaperComponent={({ children }) => (
          //   <Paper style={{ background: "yellow" }}>{children}</Paper>
          // )}
          inputValue={currencyInputValue}
          onChange={currencyInputHandler}
       renderInput={(params) => <TextField {...params} label="" InputProps={{ ...params.InputProps, inputProps: { ...params.inputProps, inputMode: 'none' }}} />}
 
        />

        {hasCurrencyInputError && (<p className={cn(
          'animate__animated',
          'animate__fadeInLeft',
          { [styles.error__message]: hasCurrencyInputError },
          { [styles.error__autocomplete]: hasCurrencyInputError }
          )}>
          {MESSAGES.EMPTY_CURRENCY}
        </p>)}
      </div>
{ 
      <div className={styles.form__section}>
        <label
          htmlFor="network"
          className={styles.form__label}
        >
          Сеть
        </label>

        <Autocomplete
          disablePortal
          id="network"
          clearIcon={null}
         disabled={!(Object.keys(CURRENCIESANDNETWORKS).includes(currencyInputValue))}
          className={styles.form__autocomplete}
          options={CURRENCIESANDNETWORKS[currencyInputValue]  }
          inputValue={networkInputValue}
          onChange={networkInputHandler}
          sx={{ width: 300 }}
        renderInput={(params) => <TextField {...params} label="" InputProps={{ ...params.InputProps, inputProps: { ...params.inputProps, inputMode: 'none' }}} />}

        />

        {hasNetworkInputError && (<p className={cn(
          'animate__animated',
          'animate__fadeInLeft',
          { [styles.error__message]: hasNetworkInputError },
          { [styles.error__autocomplete]: hasNetworkInputError }
          )}>
          {MESSAGES.EMPTY_NETWORK}
        </p>)}
      </div>}
{ 
      <button
      style={buttonStyle}
        type='submit'
        className={styles.form__submit}
      >
        {buttonTitle}
      </button>}
    </form>
  );
};