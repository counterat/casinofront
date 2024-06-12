import styles from './ModalMainButton.module.scss';

import WhiteArrowIcon from '../../../assets/icons/arrow-right.svg?react';
import { setOnClose } from '../../../utils';

export const ModalMainButton = ({
  setOnOpen = () => {},
  content,
  isDisabled,
  setHasNext = () => {},
  setHasCurrent = () => {},
  setIsCloseCurrent = () => {},
  setHasFooter = () => {},
  checkIsPaid = null,
}) => {

  const buttonHandler = () => {
    if (checkIsPaid != null){
    
      checkIsPaid()
    }
else{
    console.log(setOnOpen)
    if (setHasFooter) {
      setHasFooter(true);
    }

    setOnOpen(setHasNext);
    if (content!='Я оплатил (а)'){
 
    setOnClose(setIsCloseCurrent, setHasCurrent);}
  }};

  return (
    <button
      className={styles.button}
      type="button"
      onClick={() => buttonHandler()}
      disabled={isDisabled}
    >
      {content
        ? (
          <div className={`${styles.button__cript} ${styles.button__content}`}>
            {content}
          </div>
          ) : (
          <div className={styles.button__cript}>
            <span className={styles.button__text}>Криптовалюта</span>

            <WhiteArrowIcon />
          </div>
        )}
    </button>
  );
};
