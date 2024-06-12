import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { useEffect, useRef, useState } from 'react';
import { BETS } from '../../../utils/constants';
import { Bet } from './Bet';
import { getPreviousXes } from '../../../api/getPreviousXes';
import styles from './LastBetsSlider.module.scss';
import 'swiper/scss/navigation';
import 'swiper/scss';
import { getSlidesPerView } from '../../../utils/';
import { io } from 'socket.io-client';

import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { setLastGames, addNewElement, deleteLastElement } from '../../../redux/features/lastGamesSlice';
export const LastBetsSlider = ({
  // bets,
  // isLoading,
  // hasError,
  moverClass,
}) => {
  const dispatch = useDispatch();
  // const hasErrorMessage = hasError && !isLoading;
  // const hasNoItemsOnServer = !bets.length && !hasError && !isLoading;
 
  const slideWidth = 64;
  const spaceBetween = 6;
  var previousXes;
  var bets =useRef()

  bets.current = useSelector((state)=>state.lastGames.lastGames);

  var currentMultiplier = useRef()
  currentMultiplier.current=useSelector((state)=>state.game.game.currentMultiplier)

  useEffect(() => {
    
    getPreviousXes()
      .then(response => {
        dispatch(setLastGames((response.data))); // Устанавливаем данные о ставках в состояние
      })
      .catch(error => {
        console.error('Error fetching bets:', error);
      });
   

      function crash_handler(){
        

          if(bets.current.length >=20){
            dispatch(deleteLastElement())
          }
          
                dispatch(addNewElement(currentMultiplier.current))  
          
                }
      
      socket.on('crash', crash_handler)

      return ()=>{
        socket.off('crash', crash_handler)
      }
  }, []);


  return (
    <section className={styles.bets}>
      {/* {hasErrorMessage && (
        <p>{MESSAGES.NO_SERVER_RESPONSE}</p>
      )}

      {hasNoItemsOnServer && (
        <p>
          {MESSAGES.NO_BETS}
        </p>
      )} */}

      {/* {isLoading && (<Loader />)} */}

      <Swiper
        loop
        modules={[Navigation]}
        navigation={{
          nextEl: `.${moverClass}-next`,
          prevEl: `.${moverClass}-prev`,
        }}
        spaceBetween={spaceBetween}
        slidesPerView={getSlidesPerView(slideWidth, spaceBetween, bets.current)}
      >
        { 
 useSelector((state) => state.lastGames.lastGames).map(bet => {
          return (
            <SwiperSlide
              key={ Math.random().toString(36).substr(2, 9)}
              className={styles.slide +' '+ (bet <= 1.1 ? styles.low:(bet<2 ? styles.average : styles.high))}
            >
              <Bet bet={bet} />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  )
};
