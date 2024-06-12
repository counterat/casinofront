import cn from 'classnames';

import { setOnClose } from '../../../utils';

import styles from './HeaderSection.module.scss';

import CloseIcon from '../../../assets/icons/close.svg?react';
import ArrowIcon from '../../../assets/icons/arrow-left.svg?react';

export const HeaderSection = ({
  hasForm,
  setHasThisModal = () => {},
  setHasPrev = () => {},
  setOnOpen = () => {},
  setIsThisModalClose = () => {},
  hasSuccess,
  closeHandler = () => {},
  hasAddress,
  getModalTitle = () => {},
  title,
}) => {
  const getBack = () => {
    setOnClose(setIsThisModalClose, setHasThisModal);
    setOnOpen(setHasPrev);
  };

  const setClose = () => {
    setOnClose(setIsThisModalClose, setHasThisModal);
    closeHandler(false)
  };

  return (
    <header>
      <div className={styles.header__buttons}>
        <button
          className={cn(
            styles.header__close,
            { [styles.hide]: !hasForm && !hasAddress}
          )}
          type="button"
          onClick={() => getBack()}
          disabled={!hasForm && !hasAddress}
        >
          <ArrowIcon />
        </button>

        <button
          className={cn(
            styles.header__close,
            { [styles.hide]: hasSuccess}
          )}
          type="button"
          onClick={() => setClose()}
        >
          <CloseIcon />
        </button>
      </div>

      <h3 className={styles.header__title}>
        {!title
          ? getModalTitle(hasForm, hasSuccess, hasAddress)
          : title
        }
      </h3>
  </header>
  );
};
