import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
/* import { socket } from './socket'; */
import { authorise } from './api/authorise';
import { Header } from './components';
import { HomePage, Screensaver, UserPage } from './pages';
import { Footer } from './components';
import { useSelector } from 'react-redux';
/////////////////////////
import { USER } from './utils/constants';
import { setUser } from './redux/features/userSlice';

////////////////////////

export const App = () => {
  let tgUsername;
  let tgId;
  let photoUrl;
  const pathname = useRef();
  pathname.current = window.location.pathname;
  const [isConnected, setIsConnected] = useState(false);
  const { hasUserPage } = useSelector((state) => state.hasUserPage);
  const dispatch = useDispatch();
  var lol;

  useEffect(() => {
    var WebApp = window.Telegram.WebApp;
    console.log(WebApp.initData);
    lol = WebApp.initData;
    if (WebApp.initDataUnsafe.user) {
      tgUsername = WebApp.initDataUnsafe.user.first_name;
      tgId = WebApp.initDataUnsafe.user.id;

      if (WebApp.initDataUnsafe.user.photo_url) {
        photoUrl = WebApp.initDataUnsafe.user.photo_url;
        alert(photoUrl);
      }
      WebApp.ready();
      WebApp.expand();
    } else {
      tgUsername = WebApp.initData;
      tgId = 'leel';
    }
    let invitCode = null;
    if (pathname.current) {
      invitCode = pathname.current.split('/')[1];
    }
    authorise(tgUsername, tgId, invitCode)
      .then((response) => {
        response['user']['deposit_balance'] =
          response['user']['deposit_balance'].toFixed(2);
        response['user']['bonus_balance'] =
          response['user']['bonus_balance'].toFixed(2);

        dispatch(setUser(response['user']));

        WebApp.ready();
        WebApp.expand();
        setIsConnected(true);
      })
      .catch((error) => {
        console.error('Error occurred:', error);
      });
  }, []);

  // const [isConnected, setIsConnected] = useState(socket.connected);

  // useEffect(() => {
  //   function onConnect() {
  //     setIsConnected(true);

  //     const webApp = window.Telegram.WebApp;
  //     const telegramUsername = document.querySelector('#ipAdress').value ;
  //     const ipAdress = document.querySelector('#ipAdress').value;

  //     webApp.expand();
  //   }

  //   function onDisconnect() {
  //     setIsConnected(false);
  //   }

  //   function onFooEvent(value) {
  //     dispatch(setUser(() => value));

  //     // setFooEvents(previous => [...previous, value]);
  //   }

  //   socket.on('connect', onConnect);
  //   socket.on('disconnect', onDisconnect);
  //   socket.on('foo', onFooEvent);

  //   return () => {
  //     socket.off('connect', onConnect);
  //     socket.off('disconnect', onDisconnect);
  //     socket.off('foo', onFooEvent);
  //   };
  // }, []);

  return (
    <div className="app">
      {!isConnected ? (
        <Screensaver />
      ) : (
        <>
          <Header />

          <main className="main">
            {!hasUserPage ? <HomePage /> : <UserPage />}
          </main>
        </>
      )}
    </div>
  );
};
