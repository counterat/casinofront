import cn from 'classnames';

import GiftIcon from '../../../assets/icons/gift-icon.svg?react';
import PromocodeIcon from '../../../assets/icons/promocode-icon.svg?react';
import SupportIcon from '../../../assets/icons/message-question.svg?react';
import FlagIcon from '../../../assets/icons/flag.svg?react';
import ShevronIcon from '../../../assets/icons/chevron-right-grey.svg?react';

import { MODAL_TYPES, iconTypes } from '../../../utils/constants';

import styles from './Option.module.scss';

const getIcon = (type) => {
  switch (type) {
    case iconTypes.giftIcon: return (<GiftIcon />);
    case iconTypes.promocodeIcon: return (<PromocodeIcon />);
    case iconTypes.supportIcon: return (<SupportIcon />);
    case iconTypes.flagIcon: return (<FlagIcon />);
  }
};

export const Option = ({
  option,
  selectedOption,
  setSelectedOption,
  setModalType,
  setHasFooter,
}) => {
  const icon = getIcon(option.icon);

  const isSelected = selectedOption === option.title;

  const optionHandler = () => {
    setSelectedOption(option.title);

    //////////////////
    if (option.modalType === MODAL_TYPES.REFERAL) {
      setModalType(option.modalType);
      setHasFooter(true);
    }
   else if (option.modalType === MODAL_TYPES.PROMOCODE){
    setModalType(option.modalType);
      setHasFooter(true);
   }
  };

  return (
    <li>
      <button
        className={cn(
          styles.option,
          { [styles.option__selected]: isSelected }
        )}
        onClick={() => optionHandler()}
      >
        <div className={styles.option__container}>
          <span className={styles.option__icon}>{icon}</span>

          <span className={styles.option__title}>{option.title}</span>
        </div>

        <ShevronIcon />
      </button>
    </li>
  );
};
