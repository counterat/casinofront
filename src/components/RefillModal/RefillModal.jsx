import { useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { setBonusBalance, setDepositBalance } from '../../redux/features/userSlice';
import { HeaderSection, ModalMainButton, SuccessSection, ModalForm, Overlay } from '../';
import { createCopy, getRefillModalTitle, setOnClose } from '../../utils';
import { MESSAGES, MIN_REFILL_AMOUNT, buttonStyle } from '../../utils/constants';
import { makePayment } from '../../api/makePayment';
import styles from './RefillModal.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { useRef } from 'react';
import LoadingIcon from '../../assets/icons/loader-icon-white.svg?react';
import InfoIcon from '../../assets/icons/info-grey.svg?react';
import { setCurrentPayment } from '../../redux/features/currentPaymentSlice';
import { checkIsPaid } from '../../api/checkIsPaid';
////////////////////////////////


//////////////////////////////////////

export const RefillModal = ({ setHasFooter }) => {
  const user = useRef();
  user.current = useSelector(state=>state.user.user);
  const [address, setAddress] = useState('ADDRESS FROM SERVER');
  const [paymentAmount, setPaymentAmount] = useState(0)
  const [currency, setCurrency] = useState('')
  const [hasForm, setHasForm] = useState(false);
  const [isFormClose, setIsFormClose] = useState(false);

  const [hasAddress, setHasAddress] = useState(false);
  const [isAddressClose, setIsAddressClose] = useState(false);

  const [hasSuccess, setHasSuccess] = useState(false);
  const [isSuccessClose, setIsSuccessClose] = useState(false);
  const currentPayment = useRef()
  currentPayment.current = useSelector(state=>state.currentPayment.currentPayment)
  console.log(currentPayment.current)
  const [isNotPaidYet, setIsNotPaidYet ] = useState(null)
  const [isCopied, setIsCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
var dispatch = useDispatch();
  setTimeout(() => {
    setIsLoading(false);
  }, 3000);

  const setOnOpen = (setHasElement) => {
    setIsFormClose(false);
    setIsAddressClose(false);
    setIsSuccessClose(false);

    setHasElement(true);
  };

  const tooltipMessage = isCopied
  ? MESSAGES.COPIED
  : MESSAGES.TOOLTIP_COPY

const check = ()=>{

  checkIsPaid(currentPayment.current.order_id).then((json)=>{
    console.log(json)
    if (json ==1){
    return setIsNotPaidYet(true)
    }
    else{
      dispatch(setDepositBalance(json.deposit_balance))
      dispatch(setBonusBalance(json.bonus_balance))
      setOnOpen(setHasSuccess);
    }
  })

}

  const setSuccessHandler = () => {

    //////send data to server, when loading setIsLoading(true), after: setIsLoading(false) setHasSuccess(true); setHasAddress(false);
    checkIsPaid(currentPayment.current.order_id).then((json)=>{
      console.log(json)
      if (json ==1){
      return setIsNotPaidYet(true)
      }
      else{
        dispatch(setDepositBalance(json.deposit_balance))
        dispatch(setBonusBalance(json.bonus_balance))
        setOnOpen(setHasSuccess);
      }
    })
   
  };

  const sendDataToServer = (userId, amount, cryptocurrency, network) => {
    // Возвращаем промис из makePayment, чтобы можно было использовать результат в вызывающем коде
    return makePayment(userId, amount, cryptocurrency, network).then((json) => {
        // Здесь можно выполнить дополнительные действия с json, если это необходимо
        console.log('Payment successful:', json);
        dispatch(setCurrentPayment(json))
        // Возвращаем json для дальнейшего использования
        return json;
    }).catch((error) => {
        // Обработка возможных ошибок в процессе платежа
        console.error('Payment failed:', error);
        // Можно выбросить ошибку дальше, если хотите обрабатывать её на более высоком уровне
        throw error;
    });
};


  return (
    <>
      <>
        <HeaderSection
          closeHandler={setHasFooter}
          getModalTitle={getRefillModalTitle}
        />

        <ModalMainButton
          setOnOpen={setOnOpen}
          setHasNext={setHasForm}
        />
      </>

      {hasForm && (
        <Overlay isClose={isFormClose}>
          <HeaderSection
        setOnClose={setOnClose}
        hasForm={hasForm}
        setIsThisModalClose={setIsFormClose}
        setHasThisModal={setHasForm}
        closeHandler={setHasFooter}
        getModalTitle={getRefillModalTitle}
          />

          <ModalForm
          setAddress = {setAddress}
          address = {address}
          setPaymentAmount = {setPaymentAmount}
          paymentAmount = {paymentAmount}
          setCurrency = {setCurrency}
            setOnOpen={setOnOpen}
            setHasAddress={setHasAddress}
            setHasForm={setHasForm}
            subtitle='Mинимальная сумма депозита 0$'
            amount='Сумма пополнения в $'
            buttonTitle='Пополнить'
            sendDataToServer={sendDataToServer}
            minAmount={MIN_REFILL_AMOUNT}
            amountError={MESSAGES.EMPTY_REFIL_AMOUNT_INPUT}
          />
        </Overlay>
      )}

      {hasAddress && (
        <Overlay isClose={isAddressClose}>
          <HeaderSection
            setOnClose={setOnClose}
            setIsThisModalClose={setIsAddressClose}
            setHasThisModal={setHasAddress}
            closeHandler={setHasFooter}
            hasAddress={hasAddress}
            getModalTitle={getRefillModalTitle}
          />

          <p className={`${styles.refill__subheader} ${styles['refill__address-subheader']}`}>
            Адрес кошелька для пополнения
          </p>

          <div className={styles.refill__address}>
            <Tooltip title={tooltipMessage} placement="top">
              <p>
                <span>{address}</span>

                <button style={buttonStyle} onClick={() => createCopy(address, setIsCopied)} />
              </p>
              
            </Tooltip>
          </div>
          <p className={`${styles.refill__subheader} ${styles['refill__address-subheader']}`}>
            Сумма для перевода
          </p>
          <div className={styles.refill__address}>
            <Tooltip title={tooltipMessage} placement="top">
              
              <p>
              <span>{paymentAmount}{currency}</span>

                <button style={buttonStyle} onClick={() => createCopy(paymentAmount, setIsCopied)} />
              </p>
              
            </Tooltip>
          </div>

          <ModalMainButton
            setOnOpen={setOnOpen}
            setIsCloseCurrent={setIsAddressClose}
            setHasNext={setSuccessHandler}
            setHasCurrent={setHasAddress}
            isDisabled={isLoading}
            content={
              isLoading
                ? (<LoadingIcon className={styles.refill__loader} />)
                : 'Я оплатил (а)'
            }
          />

          <div className={`${styles.refill__subheader} ${styles.refill__info}`}>
            <div>
              <InfoIcon />
            </div>

            <p>Внимание: проверьте адрес кошелька и сеть перед отправкой средств.
              После отправки полной суммы на указанный адрес нажмите кнопку «я оплатил(а)»
            </p>
          </div>
        </Overlay>
      )}

      {(hasSuccess || isNotPaidYet) && (
         <Overlay isClose={isSuccessClose}>
          <HeaderSection
            setOnClose={setOnClose}
            setIsThisModalClose={setIsSuccessClose}
            setHasForm={setHasForm}
            hasSuccess={hasSuccess}
            closeHandler={setHasFooter}
            getModalTitle={getRefillModalTitle}
            title = {(isNotPaidYet && 'Оплата еще не прошла')}
          />

          <SuccessSection
          isRefill={true}
          isPaid = {!isNotPaidYet}
          checkIsPaid = {check}
            closeHandler={setHasFooter}
            content={(isNotPaidYet) ? 'Мы пополним вам баланс как только получим подтверждение транзакции' :'Баланс пополнится в течении 5 минут.'}
          />
        </Overlay>
      )}
    </>
  );
};
