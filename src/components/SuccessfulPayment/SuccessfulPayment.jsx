import { Modal } from '..';

import styles from './SuccessfulPayment.module.scss';
import { buttonStyle } from '../../utils/constants';
const customStyles = {
  overlay: {
    background: 'rgba(0, 0, 0, 0.50)',
    zIndex: 10,
  },
  content: {
    margin: '0 auto',
    padding: '0',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate(-50%, -50%)',
    outline: 'none',
    border: 'none',
    borderRadius: '24px',
    backgroundColor: 'transparent',
  },
};

export const SuccessfulPayment = ({ setIsOpen, isModalOpen }) => {
  return (
    <Modal
      customStyles={customStyles}
      isOpen={isModalOpen}
      toggleModal={() => {
        setIsOpen(false);
      }}
    >
      <div className={styles.modal}>
        <div className={styles.modal__info}>
          <h3 className={styles.modal__title}>
            Пополнение баланса
          </h3>
          <p className={styles.modal__subtitle}>
           Вы успешно пополнили баланс
          </p>

          <p className={styles.modal__subtitle}>
            Мы уже обновили ваши средства
          </p>
        </div>

        <button
        style={buttonStyle}
          className={styles.modal__close}
          type="button"
          onClick={() => setIsOpen(false)}
        >
          Закрыть
        </button>
      </div>
    </Modal>
  );
};
