import cn from 'classnames';

import styles from './RoundButton.module.scss';
import { buttonStyle } from '../../../utils/constants';
export const RoundButton = ({ onClick, isDisabled, isPlus }) => {
  return (
    <button style={buttonStyle}
      className={cn(
        styles.round,
        { [styles.round__plus]: isPlus },
        { [styles.round__minus]: !isPlus },
        )}
      onClick={onClick}
      disabled={isDisabled}
      type='button'
    />
  );
};
