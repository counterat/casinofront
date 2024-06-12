import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
/* import { socket } from './socket'; */
import { authorise } from './api/authorise';
import { Header } from './components';
import { HomePage , Screensaver, UserPage} from './pages';
import { Footer } from './components';
import { useSelector } from 'react-redux';
/////////////////////////
import { USER } from './utils/constants';
import { setUser } from './redux/features/userSlice';


////////////////////////

export const App = () => {
  let tgUsername ;
      let tgId ;
  let photoUrl;
      const pathname = useRef();
      pathname.current = window.location.pathname;
  const [isConnected, setIsConnected] = useState(false);
  const { hasUserPage } = useSelector(state => state.hasUserPage);
  const dispatch = useDispatch();
 var lol;

useEffect(() => {
  /*    var WebApp = window.Telegram.WebApp;
   console.log(WebApp.initData)
    lol = (WebApp.initData)
    if (WebApp.initDataUnsafe.user){
       tgUsername =  WebApp.initDataUnsafe.user.first_name;
       tgId = WebApp.initDataUnsafe.user.id;

 if (WebApp.initDataUnsafe.user.photo_url){
   photoUrl = WebApp.initDataUnsafe.user.photo_url
   alert(photoUrl)
 }
        WebApp.ready();
                WebApp.expand();
        }
    else{
        tgUsername = WebApp.initData;
        tgId ='leel';
        }
  let invitCode = null;
  if (pathname.current) {

    invitCode = pathname.current.split('/')[1]
  }
  authorise(tgUsername, tgId, invitCode)
    .then(response => {

    response['user']['deposit_balance'] = response['user']['deposit_balance'].toFixed(2)
    response['user']['bonus_balance'] = response['user']['bonus_balance'].toFixed(2)

      dispatch(setUser(response['user']));

      WebApp.ready();
            WebApp.expand();
            setIsConnected(true);
    })
    .catch(error => {
      console.error('Error occurred:', error);
    });
 */
    dispatch(setUser(

      {'payments': {'address': '0xda61d984b9342f8d61b05a9295c4813ac565f820', 'amount': 3.13, 'currency': 'BNB', 'description': null, 'id': 17, 'network': 'tron', 'order_id': '8caf0e15-ff0f-4aeb-bdb0-e45fe317f8be', 'status': 'check', 'url': 'https://pay.cryptomus.com/pay/cc4b9636-ae4d-4bd8-bafa-696d241a8d07', 'user_id': 12, 'uuid': 'cc4b9636-ae4d-4bd8-bafa-696d241a8d07'}, 'user': {'bets': '', 'bonus_balance': 5.0, 'created_at': 'Wed, 12 Jun 2024 08:54:48 GMT', 'deposit_balance': 0.0, 'id': 12, 'invitation_code': 939406, 'invited_users': '{"users": []}', 'number_of_loses': 0, 'number_of_wins': 0, 'password': '25d7c42c-87eb-42b1-82f9-9ad44eb7160d', 'photo_of_user_url': 'data:image/jpeg;base64,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', 'referal_balance': 0.0, 'selected_currency': 'USD', 'sign': 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6MTIsInBhc3N3b3JkIjoiMjVkN2M0MmMtODdlYi00MmIxLTgyZjktOWFkNDRlYjcxNjBkIn0.dUCQxPCEj8-EVOdi88ziEEwkPolkE903Ql2sj7dqaKc', 'telegram_id': 881704893, 'total_amount_of_balance_replenishments': 0.0, 'total_amount_of_money_losed': 0.0, 'total_amount_of_money_withdrawn_from_the_balance': 0.0, 'total_amount_of_money_won': 0.0, 'url': 'https://t.me/crashgamedistbot?start=939406', 'username': '\U0001faac', 'was_invited_by': null}}['user']
      
      
      
          ))
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
<div className='app'>
      {!isConnected
        ? (<Screensaver />)
        : (
            <>
    
              <Header />
      
              <main className='main'>
              {!hasUserPage
                  ? (<HomePage />
                    )
                  : (<UserPage />)
                }
              </main>
                 
            </>
      )}
    </div>
  );
};
