import cn from 'classnames';

import styles from './BalanceButton.module.scss';
import { buttonStyle } from '../../../utils/constants';
export const BalanceButton = ({ selectedButton, button, onClick }) => {
  const isSelected = button.id === selectedButton.id;

  return (
    <button style={buttonStyle}
      type='button'
      className={cn(
        styles.balance,
        { [styles.balance__selected]: isSelected }
      )}
      onClick={onClick}
    >
      {button.title}
    </button>
  );
};
