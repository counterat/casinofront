import { useSelector, useDispatch } from 'react-redux';

import { setHasUserPage } from '../../redux/features/userPageSlice';
import { useTheme } from '../../hooks/useTheme';
import { HeaderDropdown } from './HeaderDropdown';
import { HeaderButton } from './HeaderButton';
import {
  DARK,
  HEADER_DROPDOWN_OPTIONS,
  LIGHT,
} from '../../utils/constants';

import UserIcon from '../../assets/icons/white-user-icon.svg?react';
// import InfoIcon from '../../assets/icons/info-icon.svg?react';
import ShevronIcon from '../../assets/icons/chevron-right-white.svg?react';
import MoonIcon from '../../assets/icons/moon.svg?react';
import SunIcon from '../../assets/icons/sun.svg?react';

import styles from './Header.module.scss';

export const Header = () => {
  const { theme, setTheme } = useTheme(LIGHT);

  const { hasUserPage } = useSelector(state => state.hasUserPage);
  const dispatch = useDispatch();

  const isLightTheme = theme === LIGHT;

  // const showInfoHandler = () => {};
  const showUserPageHandler = () => {
    dispatch(setHasUserPage(!hasUserPage));
  };

  return (
    <>
      {!hasUserPage && (
        <header className={styles.header}>
          <HeaderDropdown
            options={HEADER_DROPDOWN_OPTIONS}
          />

          <div className={styles.header__buttons}>
            {/* <HeaderButton icon={<InfoIcon />} onClick={showInfoHandler} /> */}

            <HeaderButton
              icon={<UserIcon />}
              onClick={showUserPageHandler}
            />
          </div>
        </header>
      )}

      {hasUserPage && (
          <header  className={styles.header}>
            <HeaderButton
              icon={<ShevronIcon className={styles.header__back} />}
              onClick={showUserPageHandler}
            />

            <h2 className={styles.header__profile}>Профиль</h2>

            {
              isLightTheme
              ? (<HeaderButton icon={<MoonIcon />} onClick={() => setTheme(DARK)} />)
              : (<HeaderButton icon={<SunIcon />} onClick={() => setTheme(LIGHT)} />)
            }
          </header>
        )}
    </>
  );
};

