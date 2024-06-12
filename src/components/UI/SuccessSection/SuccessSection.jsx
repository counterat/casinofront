import { ModalMainButton } from '../ModalMainButton/ModalMainButton';
import styles from './SuccessSection.module.scss';

export const SuccessSection = ({isRefill=false, closeHandler, content, isPaid , checkIsPaid}) => {

  return (
    <>
      <h5 className={styles.success__subheader}>
        {content}
      </h5>

      <ModalMainButton
       setHasFooter={closeHandler}
        setOnOpen={closeHandler  }
        content={(!isPaid &&isRefill)? "Проверить еще раз" : 'Закрыть'}
        setHasNext={false}
        checkIsPaid={((!isRefill)||(isPaid && isRefill) ) ? undefined : checkIsPaid}
      />
    </>
  );
};
