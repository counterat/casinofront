import { useState } from 'react';

import { useInterval } from '../../../hooks';

import styles from './Circle.module.scss';
import { useEffect } from 'react';
export const Circle = (countTime) => {
  const [initialCountTime, setInitialCountTime] = useState(null);


  useEffect(() => {
    if (initialCountTime === null) {
      setInitialCountTime(countTime.countTime);

    }
    console.log(6-((initialCountTime/100)*6))
  }, [countTime.countTime]);
  /* let [count, setCount] = useState(0);

  const time = 4;
  const maxCount = 100;

  const delay = 1000 * time / maxCount;

  useInterval(() => {
    if (count < maxCount) {
      setCount(count + 1);
    }
  }, delay); */

  return (
    <div>
      <div className={styles.circle}>
        {/* <div id='number' className={styles.number}>%</div> */}
        <div className={styles.number}>{countTime.countTime}%</div>
      </div>

      <div className={styles.container}  style={{ '--animation-duration': `${6-((initialCountTime/100)*6)}s` }}>
        <div className={styles.box}>
          <div className={styles.innerBox}  >
            <div className={styles.ellipse} ></div>

            <div className={styles.ellipse2} ></div>
          </div>
        </div>
      </div>
    </div>
  );
};
