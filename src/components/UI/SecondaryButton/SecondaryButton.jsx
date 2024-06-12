import styles from './SecondaryButton.module.scss';
import { buttonStyle } from '../../../utils/constants';
export const SecondaryButton = ({ content, onClick, isDisabled }) => {
  return (
    <button style={buttonStyle}
      className={styles['secondary-button']}
      onClick={onClick}
      disabled={isDisabled}
      type='button'
    >
      {content}
    </button>
  );
};
