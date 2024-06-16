import { UserSlider } from '../';
import styles from './GameItem.module.scss';
import { useDispatch } from 'react-redux';
import { SuccessfulPayment } from '../SuccessfulPayment/SuccessfulPayment';
import { useEffect, useRef, useState } from 'react';
import { setGameId, setGameMultiplier } from '../../redux/features/gameSlice';
import cn from 'classnames';
import { useSelector } from 'react-redux';
import { setEnd } from '../../redux/features/endGameSlice';
import { setResultsOfgame } from '../../redux/features/resultsOfGameSlice';
import {
  deleteCurrentBet,
  setCurrentBet,
} from '../../redux/features/currentBetSlice';
import { setIsError, setErrorMsg } from '../../redux/features/isErrorSlice';
import { io } from 'socket.io-client';

import { Circle, WinLoseBoard } from '../';

export const GameItem = () => {
  const dispatch = useDispatch();

  const { startGame } = useSelector((state) => state.startGame);
  const game = useSelector((state) => state.game.game);
  const [isCircleVisible, setIsCircleVisible] = useState(false);
  const [isDisplaying, setIsDisplaying] = useState(false);
  const [isSuccess, setIsSuccess] = useState(true);
  const [isFroget, setIsFroget] = useState(false);
  const [isStartedRecently, setIsStartedRecently] = useState(false);
  const [isFinishedRecently, setIsFinishedRecently] = useState(false);
  const [isSuccessfulPayment, setIsSuccessfulPayment] = useState(false);

  const [progress, setProgress] = useState(100);

  var resultsOfGame = useRef();
  resultsOfGame.current = useSelector(
    (state) => state.resultsOfGame.resultsOfGame
  );

  var endGame = useRef();
  endGame.current = useSelector((state) => state.endGame);
  const [result, setResult] = useState(0);
  const currentBet = useRef();
  const isError = useRef();
  const errorMsg = useRef();
  errorMsg.current = useSelector((state) => state.isError.errorMsg);
  isError.current = useSelector((state) => state.isError.isError);
  let newTimerId;
  let anothernewTimerId;
  let timerId;

  useEffect(() => {
    if (resultsOfGame.current.isSuccess != null) {
      setIsDisplaying(true);

      dispatch(deleteCurrentBet());

      currentBet.current = null;
    }
    timerId = setTimeout(() => {
      console.log(resultsOfGame.current);
      setIsDisplaying(false);
      dispatch(setResultsOfgame({ isSuccess: null }));
      dispatch(setIsError(false));
      dispatch(setErrorMsg(1));
    }, 3000);

    function currentGameHandler(newData) {
      setIsFroget(true);
      setIsCircleVisible(false);
      dispatch(setGameId(newData.game_id));
      dispatch(setEnd(false));
      dispatch(setGameMultiplier(newData.current_multiplier.toFixed(2)));
    }

    function startGameHandler() {
      setIsFinishedRecently(false);
      setIsStartedRecently(true);
    }
    const paymentHandler = (data) => {
      if (data.user_id == user.current.id) {
        dispatch(setDepositBalance(data.deposit_balance.toFixed(2)));
        dispatch(setBonusBalance(data.bonus_balance.toFixed(2)));
        setIsSuccessfulPayment(true);
      }
    };

    socket.on('paid_payment', paymentHandler);

    socket.on('startgame', startGameHandler);

    socket.on('current_game', currentGameHandler);
    function timeRemainingHandler(data) {
      const percentage = Math.floor((data.seconds_remained / 60) * 100);
      setProgress(percentage);
      setIsFroget(false);
      setIsCircleVisible(true);
    }

    socket.on('time_remaining', timeRemainingHandler);

    function crashHandler() {
      setIsFinishedRecently(true);
      if (currentBet.current) {
        /* setIsFinishedRecently(false) */
        setResult(currentBet.price);

        setIsSuccess(false);
      }
      dispatch(setEnd(true));
    }

    socket.on('crash', crashHandler);
    return () => {
      socket.off('current_game', currentGameHandler);
      socket.off('paid_payment', paymentHandler);
      socket.off('crash', crashHandler);
      socket.off('time_remaining', timeRemainingHandler);
      socket.off('startgame', startGameHandler);
      clearTimeout(timerId);
    };
  }, [resultsOfGame.current.isSuccess, isError.current]);
  currentBet.current = useSelector((state) => state.currentBet.currentBet);

  return (
    <section className={styles.game}>
      <div className={styles.game__info}>
        {!isCircleVisible && (
          <p className={styles.game__ratio}>
            {game.currentMultiplier}
            <span>{'x'}</span>
          </p>
        )}
      </div>

      {!(!isFroget && isCircleVisible && !isDisplaying) && (
        <div className={`${styles.game__froget} `}>
          <div
            className={`${styles.game__frog}  ${isStartedRecently && !isFinishedRecently ? styles.game__flyFromButton : ''} ${isFinishedRecently ? styles.game__flyTopRight : ''}`}
            style={!isFroget ? { display: 'none' } : null}
          />
        </div>
      )}

      {!isFroget && isCircleVisible && !isDisplaying && (
        <div className={styles['game__circle-container']}>
          <Circle countTime={progress} />
        </div>
      )}

      <div className={styles['game__modale-container']}>
        {(isDisplaying ||
          (currentBet.current &&
            game &&
            currentBet.current.round_id == game.id &&
            resultsOfGame.current.isSuccess) ||
          isError.current) && (
          <WinLoseBoard
            errorMsg={errorMsg.current != 1 ? errorMsg.current : 1}
            isSuccess={
              isError.current
                ? !isError.current
                : resultsOfGame.current.isSuccess
            }
            rate={
              isError.current ? '' : resultsOfGame.current.amount.toFixed(2)
            }
          />
        )}
      </div>
      <div className={styles.carousel}>
        <div className={styles.carousel__container}>
          <div className={styles.carousel__cloud1}></div>
          <div className={styles.carousel__cloud2}></div>
          <div className={styles.carousel__cloud3}></div>
          <div className={styles.carousel__cloud4}></div>
          <div className={styles.carousel__cloud5}></div>
          <div className={styles.carousel__cloud6}></div>
        </div>
      </div>
      {/* <div
        className={cn(styles.game__clouds, { [styles.game__start]: startGame })}
      >
        <div className={styles.game__cloud1} />

        <div className={styles.game__cloud2} />

        <div className={styles.game__cloud3} />
      </div>

      <div
        className={cn(styles.game__clouds, {
          [styles.game__start2]: startGame,
        })}
      >
        <div className={styles.game__cloud4} />

        <div className={styles.game__cloud5} />

        <div className={styles.game__cloud6} />

        <div className={styles.game__cloud7} />

        <div className={styles.game__cloud8} />
      </div> */}
      {<UserSlider />}
      <SuccessfulPayment
        setIsOpen={setIsSuccessfulPayment}
        isModalOpen={isSuccessfulPayment}
      />
    </section>
  );
};
