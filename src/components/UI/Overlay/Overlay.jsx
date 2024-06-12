import cn from 'classnames';
import 'animate.css';

import styles from './Overlay.module.scss';

export const Overlay = ({ children, isClose ,zIndex=10}) => {
  return (
    <>
      <div className={styles.position} >
        <div className={cn(
          styles.wrapper,
          'animate__animated',
          'animate__slideInUp',
          'animate__faster',
          { 'animate__slideOutDown': isClose }
        )}  style={{zIndex:zIndex}}>
          {children}
        </div>
      </div>
    </>
  );
};
