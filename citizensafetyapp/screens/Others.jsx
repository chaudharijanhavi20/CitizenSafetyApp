import {View, Text, StyleSheet, TouchableOpacity, Linking} from 'react-native';
import React, {useCallback, useEffect, useRef, useState} from 'react';
import colors from '../redux/constants/colors';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps';
import firestore from '@react-native-firebase/firestore';
import GetLocation from 'react-native-get-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomSheet, {BottomSheetRefProps} from './Bottomsheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SmsAndroid from 'react-native-get-sms-android';

import {Avatar} from '@rneui/themed';
const Others = () => {
  const [mycurrent, setmycurrent] = useState({});
  const [datalocation, setlocation] = useState([]);
  async function getcurrentlocation(key) {
    try {
      let retrievedItem = await AsyncStorage.getItem(key);
      setmycurrent(retrievedItem);
    } catch (error) {
      console.log(error.message);
    }
    return;
  }
  const ref = useRef();
  function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
    var R = 6371; // Radius of the earth in km
    var dLat = deg2rad(lat2 - lat1); // deg2rad below
    var dLon = deg2rad(lon2 - lon1);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(deg2rad(lat1)) *
        Math.cos(deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    console.log(d);
    return parseInt(d);
  }

  function deg2rad(deg) {
    return deg * (Math.PI / 180);
  }
  const onPress = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-200);
    }
  }, [ref]);
  useEffect(() => {
    getcurrentlocation('currentlocation');
    firestore()
      .collection('citizenlocation')
      .onSnapshot(snap => {
        const tempArray = [];
        snap.forEach(item => {
          tempArray.push({
            ...item.data(),
            id: item.id,
          });
        });
        setlocation(tempArray);
      });
  }, []);
  function sendSmsData(mobileNumber, bodySMS) {
    SmsAndroid.autoSend(
        mobileNumber,
        bodySMS,
        (fail) => {
            console.log('Failed with this error: ' + fail);
        },
        (success) => {
            console.log('SMS sent successfully');
        },
    );
  }
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 19.160510697712592,
            longitude: 72.99558798226771,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}
          zoomEnabled={true}
          style={styles.map}>
          <Marker
            coordinate={{
              latitude: 19.160510697712592,
              longitude: 72.99558798226771,
            }}
          />
          {datalocation &&
            datalocation.map((datamap, index) => {
              return datamap.phonenumber === 'unknown' ? (
                ''
              ) : (
                <Marker
                  key={index}
                  coordinate={{
                    latitude: parseFloat(datamap.latitude),
                    longitude: parseFloat(datamap.longitude),
                  }}
                />
              );
            })}
        </MapView>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text style={{color: '#fff', fontWeight: 'bold'}}>
            Find people near you Click here
          </Text>
        </TouchableOpacity>
        <BottomSheet ref={ref}>
          <View style={{flex: 1}}>
            {datalocation &&
              datalocation.map((dataloc, index) => {
                console.log(dataloc);
                return (
                  <View
                    key={index}
                    style={{
                      // height: 60,
                      // // backgroundColor: '#000',
                      // // width: 300,
                      marginVertical: 10,
                      marginHorizontal: 25,
                      // paddingVertical: 40,
                      // alignItems: 'center',
                      borderRadius: 10,
                      shadowColor: '#000000',
                      shadowOffset: {
                        width: 0,
                        height: 3,
                      },
                      backgroundColor: '#fff',
                      shadowOpacity: 0.17,
                      shadowRadius: 3.05,
                      elevation: 5,
                    }}>
                    <View style={{flexDirection: 'row', marginTop: 10}}>
                      <Avatar
                        size={45}
                        rounded
                        source={{
                          uri: 'https://media.istockphoto.com/id/618338598/photo/beautiful-woman-talking-using-a-smartphone.jpg?s=2048x2048&w=is&k=20&c=PF7EZSNKE3YB76muMZeRGWHYDK3cdCmu_5s-K6KuAAk=',
                        }}
                        containerStyle={{
                          backgroundColor: 'blue',
                          marginHorizontal: 20,
                        }}
                      />
                      <View
                        style={{
                          height: 60,
                          justifyContent: 'space-evenly',
                          alignItems: 'flex-start',
                          color: '#000',
                          // backgroundColor/:"#4231",
                          zIndex: 100,
                        }}>
                        <Text style={{color: colors.screenbg, fontSize: 25}}>
                          {dataloc.phonenumber}
                        </Text>
                        <Text style={{color: colors.screenbg}}>
                          Near By{' '}
                          {getDistanceFromLatLonInKm(
                            19.160510697712592,
                            72.99558798226771,
                            parseFloat(dataloc.latitude),
                            parseFloat(dataloc.longitude),
                          )}{' '}
                          Km
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        margin: 15,
                        borderRadius: 10,
                        justifyContent: 'space-around',
                        borderTopColor:"#000",
                        borderTopWidth:1,
                        paddingTop:10
                      }}>
                      <TouchableOpacity style={{flex:1,justifyContent:"center",alignItems:"center",borderRightWidth:1}} onPress={()=>sendSmsData(dataloc.phonenumber,"Hey this is an urgent sms please help me You can find me near you in Suraksha app")}>
                        <Text style={{color: colors.screenbg}}>Message</Text>
                      </TouchableOpacity>
                      <TouchableOpacity style={{flex:1,justifyContent:"center",alignItems:"center"}} onPress={()=>Linking.openURL(`tel:${dataloc.phonenumber}`)}>
                        <Text style={{color: colors.screenbg}}>Make Call</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                );
              })}
          </View>
        </BottomSheet>
      </View>
    </GestureHandlerRootView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.screenbg,
  },
  text: {
    fontSize: 100,
    fontStyle: 'italic',
  },
  map: {
    flex: 1,
    ...StyleSheet.absoluteFillObject,
  },
  button: {
    height: 100,
    borderRadius: 25,
    aspectRatio: 1,
    backgroundColor: '#000',
    opacity: 0.6,
    position: 'absolute',
    top: 10,
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Others;
