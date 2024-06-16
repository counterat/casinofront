import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import cn from 'classnames';

import { UserSliderItem } from './UserSliderItem/UserSliderItem';

import styles from './UserSlider.module.scss';
import 'swiper/scss/navigation';
import 'swiper/scss';
import {
  setBets,
  addNewBet,
  deleteLastBet,
} from '../../../redux/features/betsSlice';
import { USERS } from '../../../utils/constants';
import { getSlidesPerView } from '../../../utils/';
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { getPreviousBets } from '../../../api/getPreviousBets';

import './Swiper.scss';
const users = USERS;

export const UserSlider = ({
  // users,
  // isLoading,
  // hasError,
  moverClass,
}) => {
  // const hasErrorMessage = hasError && !isLoading;
  // const hasNoItemsOnServer = !users.length && !hasError && !isLoading;

  const [isSliderVisible, setIsSliderVisible] = useState(false);
  var bets = useRef();
  bets.current = useSelector((state) => state.bets.bets);
  const slideWidth = 88;
  const spaceBetween = 7;
  const dispatch = useDispatch();
  const showSliderHandler = () => {
    setIsSliderVisible(!isSliderVisible);
  };

  useEffect(() => {
    getPreviousBets()
      .then((json) => {
        dispatch(setBets(json.bets));
      })
      .catch((error) => console.error(error));
    function timeRemainingHandler(data) {
      if (data.fake_bets) {
        data.fake_bets.forEach((bet) => {
          console.log(bet);
          for (const username in bet) {
            console.log(username);
            if (bets.current.length >= 20) {
              dispatch(deleteLastBet());
            }
            dispatch(addNewBet(bet[username]));
          }
        });
      }
    }
    socket.on('time_remaining', timeRemainingHandler);

    function crashHandler() {
      dispatch(setBets([]));
    }
    socket.on('crash', crashHandler);
    return () => {
      socket.off('time_remaining', timeRemainingHandler);
      socket.off('crash', crashHandler);
    };
  }, []);

  return (
    <section
      className={cn(styles.slider, { [styles.visible]: isSliderVisible })}
      onClick={() => showSliderHandler()}
    >
      {/* {hasErrorMessage && (
        <p>{MESSAGES.NO_SERVER_RESPONSE}</p>
      )}

      {hasNoItemsOnServer && (
        <p>
          {MESSAGES.NO_BETS}
        </p>
      )} */}

      {/* {isLoading && (<Loader />)} */}

      <hr className={styles.slider__line} />

      <div className={`${styles.slider__slider}`}>
        <Swiper
          loop
          modules={[Navigation]}
          navigation={{
            nextEl: `.${moverClass}-next`,
            prevEl: `.${moverClass}-prev`,
          }}
          spaceBetween={spaceBetween}
          slidesPerView={getSlidesPerView(slideWidth, spaceBetween, 10)}
        >
          {bets.current.map((bet) => {
            return (
              <SwiperSlide key={bet.id}>
                <UserSliderItem user={bet} />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </section>
  );
};
