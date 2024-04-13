
import { Provider } from 'react-redux';
import mystore from './store';
import Main from './Main';
import { useEffect } from 'react';
import { Alert } from 'react-native';
export default function App() {
  // useEffect(()=>{
  //   const gettokencodeasync = async ()=>{
  //     const token = await messaging().getToken();
  //     console.log(token);
  //   }
  //   gettokencodeasync()
  // },[])
  // useEffect(() => {
  //   const unsubscribe = messaging().onMessage(async remoteMessage => {
  //     Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
  //   });

  //   return unsubscribe;
  // }, []);
  return (
    <Provider store={mystore}>
        <Main />
    </Provider>
  );
}

