import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/userSlice';
import balanceReducer from '../features/balanceSlice';
import betsReducer from '../features/betsSlice';
import usersReducer from '../features/usersSlice';
import gameReducer from '../features/gameSlice'; 
import lastGamesReducer from '../features/lastGamesSlice';
import startGameReducer from '../features/startGameSlice';
import endGameReducer from '../features/endGameSlice';
import currentBetReducer from '../features/currentBetSlice';
import resultsOfGameReducer from '../features/resultsOfGameSlice';
import hasUserPageReducer from '../features/userPageSlice';
import currentPaymentReducer from '../features/currentPaymentSlice';
import isErrorReducer from '../features/isErrorSlice';
export const store = configureStore({
  reducer: {
    isError : isErrorReducer,
    user: userReducer,
    selectedBalance: balanceReducer,
    bets: betsReducer,
    users: usersReducer,
     game:gameReducer, 
     lastGames:lastGamesReducer,
     startGame: startGameReducer,
     endGame: endGameReducer,
     currentBet:currentBetReducer,
     resultsOfGame:resultsOfGameReducer,
     hasUserPage: hasUserPageReducer,
     currentPayment:currentPaymentReducer
  },
});
