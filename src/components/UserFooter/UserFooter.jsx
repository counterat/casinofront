import { useState } from 'react';
import cn from 'classnames';
import styles from './UserFooter.module.scss';
import { ReferalModal, WithdrawalModal, RefillModal, Overlay, PromocodeModal } from '..';
import { MODAL_TYPES } from '../../utils/constants';

export const UserFooter = ({ setHasFooter, modalType }) => {
  const [isClose, setIsClose] = useState(false);

  const setClose = () => {
    setIsClose(true);

    setTimeout(() => {
      setHasFooter(false);
    }, 400);
  };

  const actualContent = () => {
    let content = '';

    switch(modalType) {
      case MODAL_TYPES.REFILL: content = (<RefillModal setHasFooter={setClose} />);
        break;
      case MODAL_TYPES.WITHDRAWAL: content = (<WithdrawalModal setHasFooter={setClose} />);
        break;
      case MODAL_TYPES.REFERAL: content = (<ReferalModal setHasFooter={setClose} />);
        break;
      case MODAL_TYPES.PROMOCODE: content= (<PromocodeModal setHasFooter={setClose}/>);
        break;
      default: return (<></>)
    }

    return content;
  };

  return ( <footer className={styles.footer}>
    {/* <Overlay isClose={isClose}>
      {actualContent()}
    </Overlay> */}
    <div
      className={cn(
        styles.overlay,
        'animate__animated',
        'animate__fadeIn',
        'animate__fast',
        { 'animate__fadeOut': isClose }
      )}
    />

    <div className={styles.position}>
      <div className={cn(
        styles.wrapper,
        'animate__animated',
        'animate__slideInUp',
        'animate__faster',
        { 'animate__slideOutDown': isClose }
      )}>
        {actualContent()}
      </div>
    </div>
  </footer>
  );
};