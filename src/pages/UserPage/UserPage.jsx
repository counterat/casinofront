import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Tooltip from '@mui/material/Tooltip';

import { BALANCE_BUTTONS, MESSAGES, MIN_WITHDRAWAL_AMOUNT, USER_OPTIONS } from '../../utils/constants';
import { Avatar, BalanceButton, BalanceActionButton, FailWithdrawalModal } from '../../components';
import { UserFooter } from '../../components/UserFooter/UserFooter';
import { useRef } from 'react';
import styles from './UserPage.module.scss';
import { Option } from '../../components/UI/Option/Option';
import { WithdrawalModal } from '../../components';
import LoadIcon from '../../assets/icons/loader.svg?react';
import { SuccessfulPayment } from '../../components/SuccessfulPayment/SuccessfulPayment';
import { setBonusBalance, setDepositBalance } from '../../redux/features/userSlice';

export const MODAL_TYPES = {
  WITHDRAWAL: 'withdrawal',
  REFILL: 'refill',
  REFERAL: 'referal',
  PROMOCODE: 'promocode',
  SUPPORT: 'support',
  LANGUAGE: 'language',
}
export const UserPage = () => {
  const [isSuccessfulPayment, setIsSuccessfulPayment] = useState(false);
  const dispatch = useDispatch();
  const  user  = useRef()
  user.current= useSelector(state => state.user.user);
  const [modalType, setModalType] = useState('');
  const [selectedOption, setSelectedOption] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [selectedButton, setSelectedButton] = useState(BALANCE_BUTTONS[0]);
 const [isWithdrawalModalOpen, setIsWithdrawalModalOpen] = useState(false);
const [isFailWithdrawalModalOpen, setIsFailWithdrawalModalOpen] = useState(false);
const [hasFooter, setHasFooter] = useState(false);
  const selectBalanceHandler = (button) => {
    setSelectedButton(button);
  };
console.log(selectedButton)
  const tooltipMessage = isCopied
    ? MESSAGES.COPIED
    : MESSAGES.TOOLTIP_COPY

  const createCopyHandler = () => {
    navigator.clipboard.writeText(user.id);

    setIsCopied(() => true);

    setTimeout(() => {
      setIsCopied(() => false);
    }, 3000);
  };
  
  const buttonManipulate = (event, modalType) => {
    event.stopPropagation();
    var money =  (selectedButton.balance == 'mainBalance') ? (user.current.deposit_balance) : (user.current.bonus_balance)
    if (modalType==MODAL_TYPES.WITHDRAWAL && (money < MIN_WITHDRAWAL_AMOUNT)) {
      setIsFailWithdrawalModalOpen(true);

      return;
    }

    setHasFooter(true);
    setModalType(modalType);
  };
  const withdrawalHandler = (event) => {
    event.stopPropagation();
    var money =  (selectedButton.balance == 'mainBalance') ? (user.current.deposit_balance) : (user.current.bonus_balance)
    if (money <  MIN_WITHDRAWAL_AMOUNT) {
      setIsFailWithdrawalModalOpen(true);

      return;
    }

    setHasFooter(true);

    // setIsWithdrawalModalOpen(true);
  };


  useEffect(()=>{
const paymentHandler=(data)=>{
  if (data.user_id == user.current.id){
  dispatch(setDepositBalance(data.deposit_balance.toFixed(2)))
  dispatch(setBonusBalance(data.bonus_balance.toFixed(2)))
  setIsSuccessfulPayment(true)
  
  }      }


    socket.on('paid_payment', paymentHandler)

return ()=>{
  socket.off('paid_payment', paymentHandler)
}
  },[])
  const depositHandler = () => {};
  return (
    <>
    
    <section className={styles.profile}>
      <div className={styles.profile__id}>
        <Tooltip title={tooltipMessage} placement="top">
          <p>
            <span>ID {user.current.id}</span>

            <button onClick={() => createCopyHandler()} />
          </p>
        </Tooltip>
      </div>

      <Avatar user={user.current} />

      <div className={styles['profile__choose-balance']}>
        {BALANCE_BUTTONS.map(button => (
          <BalanceButton
            key={button.id}
            button={button}
            selectedButton={selectedButton}
            onClick={() => selectBalanceHandler(button)}
          />
        ))}
      </div>

      <div className={styles['profile__balance-actions']}>
        <h3 className={styles.profile__balance}>
          <span>Баланс</span>

          <p>
            <span>$</span>

            <span>{(selectedButton.balance == 'mainBalance') ? (user.current.deposit_balance) : (user.current.bonus_balance)}</span>
          </p>
        </h3>
{(selectedButton.balance == 'mainBalance') &&
  <div className={styles['profile__balance-buttons']}>
  <BalanceActionButton
        text='Депозит'
        onClick={(event) => buttonManipulate(event, MODAL_TYPES.REFILL)}
      />

      <BalanceActionButton
        text='Вывод'
        isArrow
        onClick={(event) => buttonManipulate(event, MODAL_TYPES.WITHDRAWAL)}
      />
  </div>


}
      
      </div>
      <ul className={styles.profile__options}>
          {USER_OPTIONS.map(option => (
            <Option
       
              option={option}
              key={option.title}
              selectedOption={selectedOption}
              setSelectedOption={setSelectedOption}
              setModalType={setModalType}
              setHasFooter={setHasFooter}
            />
          ))}
        </ul>

      <FailWithdrawalModal
          setIsOpen={setIsFailWithdrawalModalOpen}
          isModalOpen={isFailWithdrawalModalOpen}
        />
    <SuccessfulPayment
    setIsOpen={setIsSuccessfulPayment}
    isModalOpen={isSuccessfulPayment}
    
    />

    </section>
    {hasFooter && (
        <UserFooter
          setHasFooter={setHasFooter}
          modalType={modalType}
        />
      )}
    
    </>
    
  )
};
