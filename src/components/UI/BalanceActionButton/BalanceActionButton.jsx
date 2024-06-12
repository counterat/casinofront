import cn from 'classnames';

import styles from './BalanceActionButton.module.scss';
import { buttonStyle } from '../../../utils/constants';
export const BalanceActionButton = ({ text, isArrow, onClick }) => {
  return (
    <button 
    style={buttonStyle}
      type='button'
      onClick={onClick}
      className={cn(
        styles['balance-action-button'],
        { [styles.arrow]: isArrow },
        { [styles.plus]: !isArrow }
      )}
    >
      {text}

      <span />
    </button>
  );
};
