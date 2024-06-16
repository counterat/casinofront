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
    console.log(6 - (initialCountTime / 100) * 6);
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
    <div className={styles.wrapper}>
      <div
        className={styles.load}
        style={{
          '--time': `${6 - (initialCountTime / 100) * 6}s`,
          '--p': countTime.countTime,
        }}
      ></div>
      <div className={styles.loadBackDrop} />
    </div>
  );
};
