import { View, Text, StyleSheet, Dimensions, TouchableOpacity, PermissionsAndroid, DeviceEventEmitter, Alert, NativeEventEmitter, NativeModules } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
// import Lottie from 'lottie-react-native';
// import { useNavigation } from '@react-navigation/native';
// import { removeItem } from '../utils/asyncStorage';
const { width, height } = Dimensions.get('window');
import SmsListener from 'react-native-android-sms-listener'
// import Contacts from 'react-native-contacts';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Mainpage from './Mainpage';
import Sos from './Sos';
import Others from './Others';
import Infopage from './Infopage';
import Colors from '../redux/constants/colors';
import Blog from './Blog';
import Icon, { Icons } from '../components/Icons';
import * as Animatable from 'react-native-animatable';
import { Smsclassifier, query } from './api/functions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GetLocation from 'react-native-get-location'
import { getPhoneNumber } from 'react-native-device-info';
import firestore from '@react-native-firebase/firestore';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Innerdetail from './Innerdetail';

const InfoStack = createNativeStackNavigator();
function Infostackscreen() {
  return (
    <InfoStack.Navigator initialRouteName='Infodata'>
      <InfoStack.Screen options={{ headerShown: false }} name="Infodata" component={Infopage} />
      <InfoStack.Screen options={{ headerShown: false }} name="innerInfo" component={Innerdetail} />
      {/* <InfoStack.Screen name="Details" component={DetailsScreen} /> */}
    </InfoStack.Navigator>
  );
}

const TabArr = [
  { route: 'Home', label: 'Home', type: Icons.Ionicons, activeIcon: 'grid', inActiveIcon: 'grid-outline', component: Mainpage },
  // { route: 'Sos', label: 'Sos', type: Icons.MaterialCommunityIcons, activeIcon: 'heart-plus', inActiveIcon: 'heart-plus-outline', component: Sos },
  { route: 'Info', label: 'Info', type: Icons.FontAwesome, activeIcon: 'info-circle', inActiveIcon: 'info-circle', component: Infostackscreen },
  { route: 'Blog', label: 'Blog', type: Icons.FontAwesome, activeIcon: 'file-text', inActiveIcon: 'file-text', component: Blog },
  { route: 'Others', label: 'Others', type: Icons.FontAwesome, activeIcon: 'map-o', inActiveIcon: 'map-marker', component: Others },
];
const API_KEY = 'AIzaSyAm29yPSS5TaOKxDe5dZmSmlFvwomRL2fg';
const Tab = createBottomTabNavigator();

const TabButton = (props) => {
  const { item, onPress, accessibilityState } = props;
  const focused = accessibilityState.selected;
  const viewRef = useRef(null);

  useEffect(() => {
    if (focused) {
      viewRef.current.animate({ 0: { scale: .5, rotate: '0deg' }, 1: { scale: 1.5, rotate: '360deg' } });
    } else {
      viewRef.current.animate({ 0: { scale: 1.5, rotate: '360deg' }, 1: { scale: 1, rotate: '0deg' } });
    }
  }, [focused])
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={1}
      style={[styles.container, { top: 0 }]}>
      <Animatable.View
        ref={viewRef}
        duration={1000}
      >
        <Icon type={item.type}
          name={focused ? item.activeIcon : item.inActiveIcon}
          color={focused ? Colors.buttonbg : Colors.screenbg} />
      </Animatable.View>
      <Animatable.Text
        style={[styles.text, Colors.black]}>
        {item.label}
      </Animatable.Text>
    </TouchableOpacity>
  )
}
export default function HomeScreen() {

  const [spamsmslist, setspamsmslist] = useState([])
  const requestSmsPermission = async () => {
    try {
      const permission = await PermissionsAndroid
        .requestMultiple(
          [PermissionsAndroid.PERMISSIONS.CAMERA,
          PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
          PermissionsAndroid.PERMISSIONS.RECEIVE_SMS,
          PermissionsAndroid.PERMISSIONS.READ_CALL_LOG,]

        );
      // setReceiveSmsPermission(permission);
    } catch (err) {
      console.log(err);
    }
  };

  async function retrieveItem(key) {
    try {
      let retrievedItem = await AsyncStorage.getItem(key);
      return retrievedItem;
    } catch (error) {
      console.log(error.message);
    }
    return
  }

  function extractUrls(inputString) {
    const urlPattern = /\b(?:https?|ftp):\/\/\S+\b/g;
    return inputString.match(urlPattern) || [];
  }
  useEffect(() => {
    // AsyncStorage.setItem("phonenumber","")
    const setdata = async () => {
      GetLocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 60000,
      })
        .then(async (location) => {
          const isphonenumber = await retrieveItem("phonenumber")
          if (isphonenumber) {
            firestore().collection('citizenlocation').doc(isphonenumber).update({
              latitude: location.latitude,
              longitude: location.longitude,
            })
          }
          else {
            getPhoneNumber().then(async (phoneNumber) => {
              if (phoneNumber === "unknown") {
                await firestore().collection('citizenlocation').add({
                  latitude: location.latitude,
                  longitude: location.longitude,
                  phonenumber: phoneNumber
                }).then(function (docRef) {
                  AsyncStorage.setItem("phonenumber", docRef.id)
                  console.log("Document written with ID: ", docRef.id);
                })
                  .catch(function (error) {
                    console.error("Error adding document: ", error);
                  });
                // AsyncStorage.setItem("phonenumber", phoneNumber)
              }
              else {
                await firestore().collection("citizenlocation").add({
                  latitude: location.latitude,
                  longitude: location.longitude,
                  phonenumber: phoneNumber
                }).then(function (docRef) {
                  AsyncStorage.setItem("phonenumber", docRef.id)
                  console.log("Document written with ID: ", docRef.id);
                })
                  .catch(function (error) {
                    console.error("Error adding document: ", error);
                  });
                  // AsyncStorage.setItem("phonenumber",phoneNumber)
              }
            });
          }
          AsyncStorage.setItem("currentlocation", JSON.stringify({ latitude: location.latitude, longitude: location.longitude }))
          // console.log(location);
        })
        .catch(error => {
          const { code, message } = error;
          console.warn(code, message);
        })


    }
    // setInterval(()=>{
    setdata()
    // },[300000])

  }, [])
  useEffect(() => {
    if (retrieveItem('fraudsmslist').length > 0) {
      setspamsmslist(JSON.parse(retrieveItem('fraudsmslist')))
      console.log(spamsmslist)
    }
    Smsclassifier({ "inputs": "message.body" })
    query({ "inputs": "urls[0]" })
    requestSmsPermission();
    // const callDetector = new CallDetectorManager(
    //   (event, number) => {
    //     console.log(event, number)
    //     if (event === "Incoming") {
    //       console.log(number)
    //       if (Fraudnumbers.includes(parseInt(number))) {
    //         Alert.alert("Fraud Number")
    //         RNCallKeep.displayIncomingCall("af7c1fe6-d669-414e-b066-e9733f0de7a8", number, localizedCallerName = '', handleType = 'number', hasVideo = false, options = null);
    //         RNCallKeep.rejectCall("af7c1fe6-d669-414e-b066-e9733f0de7a8")
    //       }
    //     }
    //   },
    //   true,
    //   () => { },
    //   {
    //     title: "Phone State Permission",
    //     message:
    //       "This app needs access to your phone state in order to react and/or to adapt to incoming calls."
    //   }
    // );
    SmsListener.addListener(message => {
      const urls = extractUrls(message.body)
      let fraudurlscore, validurlscore, fraudsmsscore, validsmsscore;

      if (urls.length > 0) {
        try {
          query({ "inputs": urls[0] }).then((response) => {
            validurlscore = response[0][0].score
            fraudurlscore = response[0][1].score
            Smsclassifier({ "inputs": message.body }).then((response) => {
              console.log(response)
              if (response[0][0].label === "LABEL_1") {
                fraudsmsscore = response[0][0].score
                validsmsscore = response[0][1].score
              }
              else {
                fraudsmsscore = response[0][1].score
                validsmsscore = response[0][0].score
              }

              if ((validurlscore < fraudurlscore && fraudurlscore > 0.4) || fraudsmsscore > validsmsscore) {
                const updatedList = [...spamsmslist, message.body];
                setspamsmslist(updatedList);

                AsyncStorage.setItem("fraudsmslist", JSON.stringify(updatedList))
                  .then(() => {
                    console.log("AsyncStorage updated successfully");
                  })
                  .catch((error) => {
                    console.error("Error updating AsyncStorage:", error);
                  });

                Alert.alert("It's a fraud SMS. Stay alert from URLs!");
                console.log("Updated list: ", updatedList);
              }
            });
          });
        } catch (error) {
          console.log("Something went wrong")
        }

      }
      else {
        try {
          Smsclassifier({ "inputs": message.body }).then((response) => {
            console.log(response)
            if (response[0][0].label === "LABEL_1") {
              fraudsmsscore = response[0][0].score
              validsmsscore = response[0][1].score
            }
            else {
              fraudsmsscore = response[0][1].score
              validsmsscore = response[0][0].score
            }
            console.log(fraudsmsscore, validsmsscore)
            if (fraudsmsscore > validsmsscore) {
              const updatedList = [...spamsmslist, message.body];
              setspamsmslist(updatedList);

              AsyncStorage.setItem("fraudsmslist", JSON.stringify(updatedList))
                .then(() => {
                  console.log("AsyncStorage updated successfully");
                })
                .catch((error) => {
                  console.error("Error updating AsyncStorage:", error);
                });

              Alert.alert("It's a fraud SMS. Stay alert from URLs!");
              console.log("Updated list: ", updatedList);
            }
          });
        } catch (error) {
          console.log("Something went wrong")
        }

      }
    })
  }, [spamsmslist]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 60,
            position: 'absolute',
            margin: 16,
            borderRadius: 16,
            justifyContent: 'center',
            alignItems: 'center',
          }
        }}
      >
        {TabArr.map((item, index) => {
          return (
            <Tab.Screen key={index} name={item.route} component={item.component}
              options={{
                tabBarShowLabel: false,
                tabBarButton: (props) => <TabButton {...props} item={item} />
              }}
            />
          )
        })}
      </Tab.Navigator>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    color: "#fff"
  },
  text: {
    fontSize: 12,
    textAlign: 'center',
    marginTop: 5,
    color: Colors.buttonbg,
    fontWeight: '500'
  }
})