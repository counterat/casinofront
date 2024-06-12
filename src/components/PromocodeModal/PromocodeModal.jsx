import { useEffect, useState } from 'react';
import Tooltip from '@mui/material/Tooltip';
import { HeaderSection, ModalMainButton, SuccessSection, Overlay } from '../';
import { MESSAGES, PROMOCODE_MODAL_TITLE } from '../../utils/constants';


import { USER } from '../../utils/constants';
import { createCopy } from '../../utils';
import { enterPromocode } from '../../api/enterPromocode';
import styles from './PromocodeModal.module.scss';
import { useDispatch } from 'react-redux';
import { setDepositBalance, setBonusBalance } from '../../redux/features/userSlice';
import InfoIcon from '../../assets/icons/info-grey.svg?react';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import { setOnClose } from '../../utils';
import { getRefillWithdrawalTitle } from '../../utils/services/getRefillWithdrawalTitle';
export const PromocodeModal = ({ setHasFooter }) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFailure, setIsFailure] = useState(false);
  const [isSuccessClose, setIsSuccessClose] = useState(false);
  const [hasSuccess, setHasSuccess] = useState(false);
  const [whichPromocodeWasActivated, setWhichPromocodeWasActivated] = useState(null)
  const [hasForm, setHasForm] = useState(false);
  const [isNotPaidYet, setIsNotPaidYet ] = useState(null)
const user = useRef();
user.current = useSelector(state=>state.user.user);
  const closeHandler = () => {
    setHasFooter(false);
  };
const dispatch = useDispatch();
  const tooltipMessage = isCopied
  ? MESSAGES.COPIED
  : MESSAGES.TOOLTIP_COPY
const [promocode, setPromocode] = useState('')
const enterPromocodeHandler = ()=>{
    
    enterPromocode(user.current.id, promocode).then((json)=>{

if (!json.error_status){
  dispatch(setBonusBalance(json.bonus_balance))
  dispatch(setDepositBalance(json.deposit_balance))
return setIsSuccess(true);

}

setIsFailure(true);

    })




}
const changePromocodeHandler = (event)=>{
    setPromocode(event.target.value)
    setWhichPromocodeWasActivated(event.target.value)
}

useEffect(()=>{


return ()=>{
   
}

},[isSuccess, isFailure])

  return (
    <div>
    <div className={styles.referal}>
      <HeaderSection
        closeHandler={closeHandler}
        title={PROMOCODE_MODAL_TITLE.TITLE}
      />

      <div className={`${styles.referal__share}`}>
        Введи BONUS и получи 5$ на бонусный баланс!
      </div>

      <div>
        <p className={`${styles.referal__subheader} ${styles['referal__address-subheader']}`}>
            Промокод
        </p>

        <div className={styles.referal__address}>
        <div className={styles['form__input-wrapper']}>
          <input
            className={styles.form__input}
            id="amount"
            type="text"
            placeholder='BONUS'
            onChange={changePromocodeHandler}
          />
        </div>

        </div>

        <ModalMainButton content='Ввести' setOnOpen={()=>enterPromocodeHandler()} />

        <div className={`${styles.referal__subheader} ${styles.referal__info}`}>
          <div>
            <InfoIcon />
          </div>

          <p> Следите за промокодами в нашем 
            <span> телеграмм канале</span>. Промокод можно активировать только один раз
          </p>
        </div>
      </div>
    </div>
    
    {(isSuccess || isFailure) && (
        <Overlay isClose={isSuccessClose}>
          <HeaderSection
            setOnClose={setOnClose}
            setIsThisModalClose={setIsSuccessClose}
            setHasForm={setHasForm}
            hasSuccess={hasSuccess}
            closeHandler={setHasFooter}
            getModalTitle={getRefillWithdrawalTitle}
            title = {isSuccess ? 'Вы успешно активировали промокод' : "Ошибка активации промокода"}
          />

          <SuccessSection
          isRefill={false}
          isPaid = {!isNotPaidYet}
 
            closeHandler={setHasFooter}
            content={isSuccess ? `Вы успешно активировали промокод ${whichPromocodeWasActivated}. Средства были зачислены вам на баланс` : `Промокод ${whichPromocodeWasActivated} недействителен` }
            />
        </Overlay>
      )}
    
    
    </div>
    
  );
};
