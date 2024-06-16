import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';
import 'animate.css';
import { makeBet } from '../../api/makeBet';
import { RoundButton, SecondaryButton } from '../';
import { setRateInput } from '../../utils';
import { setStart } from '../../redux/features/startGameSlice';
import { setGameId } from '../../redux/features/gameSlice';
import { useRef } from 'react';
import {
  setCurrentBet,
  deleteCurrentBet,
} from '../../redux/features/currentBetSlice';
import {
  setBonusBalance,
  setDepositBalance,
} from '../../redux/features/userSlice';
import { setResultsOfgame } from '../../redux/features/resultsOfGameSlice';
import { buttonStyle } from '../../utils/constants';
import { setIsError, setErrorMsg } from '../../redux/features/isErrorSlice';
import {
  DECREASE,
  DIVIDE,
  DOUBLE,
  HALF,
  INCREASE,
  INITIAL_RATE_VALUE,
  MAX,
  MESSAGES,
  MULTIPLY_ONE_AND_A_HALF,
  ONE_AND_A_HALF,
  MULTIPLY_TWICE,
  USER,
  WIN_AMOUNT,
  MAKE_MAX,
  SET_BY_USER,
  CHANGE_USER_BALANCE,
} from '../../utils/constants';

import styles from './Footer.module.scss';
import { io } from 'socket.io-client';
import { pickUpWinning } from '../../api/pickUpWinning';

export const Footer = () => {
  const [coeffToAutoWithdraw, setCoeffToAutoWithdraw] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [rateInputValue, setRateInputValue] = useState('');
  const [userCurrentBalance, setUserCurrentBalance] = useState(0);
  const [isNotEnoughMoneyError, setIsNotEnoughMoneyError] = useState(false);
  const [impossibleToMakeBet, setimpossibleToMakeBet] = useState(false);

  const [succesMsg, setSuccessMsg] = useState('');
  const [multiplierInputValue, setMultiplierInputValue] =
    useState(INITIAL_RATE_VALUE);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  //////

  const user = useRef();
  const game = useRef();
  const isGameStarted = useRef();
  isGameStarted.current = useSelector((state) => state.startGame.startGame);
  game.current = useSelector((state) => state.game.game);
  var resultsOfGame = useRef();
  resultsOfGame.current = useSelector(
    (state) => state.resultsOfGame.resultsOfGame
  );
  var betFromUser = useRef();
  betFromUser.current = useSelector((state) => state.currentBet.currentBet);

  user.current = useSelector((state) => state.user.user);
  var { selectedBalance } = useSelector((state) => state.selectedBalance);
  let timerId;
  const dispatch = useDispatch();
  const isError = useRef();
  isError.current = useSelector((state) => state.isError.isError);

  const inputRateHandler = (option, customValue) => {
    return setRateInput(
      option,
      rateInputValue,
      setIsNotEnoughMoneyError,
      setRateInputValue,
      userCurrentBalance,
      customValue
    );
  };

  useEffect(() => {
    setUserCurrentBalance(() => {
      if (user.current) {
        if (selectedBalance.balance == 'mainBalance') {
          return user.current.deposit_balance;
        } else {
          return user.current.bonus_balance;
        }
      } else {
        return 0;
      }
    });
    timerId = setTimeout(() => {
      dispatch(setIsError(false));
      dispatch(setErrorMsg(''));
      setIsSuccess(false);
      setIsNotEnoughMoneyError(false);
    }, 3000);

    function timeRemainingHandler(data) {
      dispatch(setGameId(data['for_game']));
    }
    function currentGameHandler(data) {
      dispatch(setStart(true));
      if (betFromUser.current) {
        if (coeffToAutoWithdraw) {
          console.log(coeffToAutoWithdraw);
          if (data.current_multiplier >= coeffToAutoWithdraw) {
            pickUpWinningHandler();
          }
          console.log(data);
        }
      }
    }
    function crashHandler() {
      setCoeffToAutoWithdraw(null);
      if (betFromUser.current && !betFromUser.current.isSuccess) {
        dispatch(
          setResultsOfgame({
            isSuccess: false,
            amount: betFromUser.current.price,
          })
        );
      }
      dispatch(setStart(false));
    }
    function startGameHandler() {
      dispatch(setStart(true));
    }

    socket.on('crash', crashHandler);

    socket.on('current_game', currentGameHandler);

    socket.on('time_remaining', timeRemainingHandler);
    dispatch(setStart(false));

    inputRateHandler(CHANGE_USER_BALANCE);

    return () => {
      socket.off('time_remaining', timeRemainingHandler);
      socket.off('current_game', currentGameHandler);
      socket.off('crash', crashHandler);
      clearTimeout(timerId);
    };
  }, [
    selectedBalance,
    isError.current,
    isSuccess,
    user.current?.deposit_balance,
    user.current?.bonus_balance,
  ]);
  var selectedB = useSelector((state) => state.selectedBalance.selectedBalance);
  /*   console.log(selectedB) */

  const pickUpWinningHandler = () => {
    var response = pickUpWinning(betFromUser.current.id);
    response.then((json) => {
      if (json['status'] == 'error') {
        dispatch(setIsError(true));
        dispatch(setErrorMsg('Невозможно забрать ставку'));
      } else {
        setCoeffToAutoWithdraw(null);
        dispatch(setResultsOfgame({ isSuccess: true, amount: json.amount }));

        dispatch(setDepositBalance(json['user']['deposit_balance'].toFixed(2)));
        dispatch(setBonusBalance(json['user']['bonus_balance'].toFixed(2)));
      }
    });
  };

  const makeBetHandler = () => {
    let baltype = (balance) => {
      if (balance == 'mainBalance') {
        return 'deposit';
      }
      return 'bonus';
    };

    if (inputRateHandler() == 0) {
      return setIsNotEnoughMoneyError(true);
    }

    var response = makeBet(
      game.current.id,
      user.current.id,
      inputRateHandler(),
      baltype(selectedB.balance)
    );
    if (response) {
      response.then((json) => {
        if (json.status == 'impossible_to_make_a_bet') {
          dispatch(setErrorMsg('Невозможно поставить ставку!'));
          return dispatch(setIsError(true));
        } else {
          if (isChecked) {
            if (multiplierInputValue) {
              setCoeffToAutoWithdraw(multiplierInputValue);
            }
          }
          dispatch(
            setDepositBalance(json.balances['deposit_balance'].toFixed(2))
          );
          dispatch(setBonusBalance(json.balances['bonus_balance'].toFixed(2)));
          dispatch(setCurrentBet(json));
          setSuccessMsg('Вы успешно поставили ставку');
          return setIsSuccess(true);
        }
      });
    }
    setIsNotEnoughMoneyError(false);
  };
  const formSubmitHandler = (event) => {
    event.preventDefault();

    /*  dispatch(setStart(true)); */
  };

  return (
    <footer className={styles.footer}>
      <form onSubmit={(event) => formSubmitHandler(event)}>
        <div className={styles['footer__rate-section']}>
          <div className={styles['footer__rate-management']}>
            {
              <p
                className={cn('animate__animated', 'animate__fadeInLeft', {
                  [styles.error__message]: isNotEnoughMoneyError,
                })}
              ></p>
            }

            <div
              className={cn(
                styles['footer__add-substract'],
                { [styles['error__no-money']]: isNotEnoughMoneyError },
                { [styles['success__add-substract']]: isSuccess }
              )}
            >
              {isSuccess ? (
                <div>
                  <p>{succesMsg}</p>

                  {/* <span>Вы успешно поставили ставку </span> */}
                </div>
              ) : (
                <>
                  <RoundButton onClick={() => inputRateHandler(DECREASE)} />

                  <label className={styles.footer__label}>
                    <input
                      type="number"
                      value={rateInputValue}
                      placeholder="0"
                      onChange={(e) =>
                        inputRateHandler(SET_BY_USER, e.target.value)
                      }
                      className={styles.footer__input}
                    />
                  </label>

                  <RoundButton
                    isPlus
                    onClick={() => inputRateHandler(INCREASE)}
                  />
                </>
              )}
            </div>

            <div className={styles['footer__multiple-divide-section']}>
              <div className={styles['footer__math-buttons-container']}>
                <SecondaryButton
                  content={DOUBLE}
                  onClick={() => inputRateHandler(MULTIPLY_TWICE)}
                />

                <SecondaryButton
                  content={ONE_AND_A_HALF}
                  onClick={() => inputRateHandler(MULTIPLY_ONE_AND_A_HALF)}
                />

                <SecondaryButton
                  content={HALF}
                  onClick={() => inputRateHandler(DIVIDE)}
                />
              </div>

              <SecondaryButton
                content={MAX}
                onClick={() => inputRateHandler(MAKE_MAX)}
              />
            </div>
          </div>

          <button
            style={buttonStyle}
            className={cn(
              styles['footer__submit-btn'],
              { [styles['success__submit-btn']]: isSuccess },
              { [styles.loading]: isLoading },
              { [styles['error__submit-btn']]: isError.current }
            )}
            onClick={
              betFromUser.current && isGameStarted.current
                ? pickUpWinningHandler
                : makeBetHandler
            }
            type="submit"
          >
            {betFromUser.current && isGameStarted.current ? (
              <p>ЗАБРАТЬ</p>
            ) : (
              <p>СТАВКА</p>
            )}
          </button>
        </div>

        <div className={styles.footer__withdrawal}>
          <div className={styles.footer__multiplier}>
            <span className={styles['footer__accent-color']}>X</span>

            <label className={styles.footer__label}>
              <input
                type="number"
                value={multiplierInputValue}
                onChange={(e) => setMultiplierInputValue(e.target.value)}
                className={`${styles.footer__input} ${styles['footer__input-multiplier']}`}
              />
            </label>
          </div>

          <div className={styles.footer__checkbox}>
            <label
              className={cn(styles['footer__checkbox-label'], {
                [styles.footer__checked]: isChecked,
              })}
            >
              <input
                id="withdrawal"
                type="checkbox"
                className={styles['footer__input-checkbox']}
                onClick={() => setIsChecked(!isChecked)}
              />
            </label>
            <span>Авто-вывод</span>
          </div>
        </div>
      </form>
    </footer>
  );
};
