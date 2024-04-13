import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import colors from '../../redux/constants/colors'
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ListItem, Avatar, Button, Icon, Input} from '@rneui/themed';

export default function Smsfraud() {
  const [addspamsmslist,setaddspamsmslist]=useState([])
  async function retrieveItem(key) {
    try {
      console.log("sdnn")
      let retrievedItem = await AsyncStorage.getItem(key);
      console.log("humara retrieved item ", JSON.parse(retrievedItem))
      setaddspamsmslist(JSON.parse(retrievedItem))
    } catch (error) {
      console.log(error.message);
    }
    return
  }
  useEffect(()=>{
    retrieveItem("fraudsmslist")
  },[])
  return (
    <View style={styles.component}>
      <Text
        style={{
          fontSize: 30,
          margin: 20,
          fontWeight: '600',
          textAlign: 'left',
          color:colors.white
        }}> 
        Fraud Blocks
      </Text>
      <ScrollView>
        {
          addspamsmslist && addspamsmslist.map((smslist,index)=>{
            return (
              <View key={index}>
                <ListItem.Swipeable
                  style={{
                    width: 340,
                    margin: 5,
                  }}
                  containerStyle={{
                    backgroundColor: colors.grayscreenbg,
                    borderRadius: 10,
                    color: colors.white,
                  }}>
                  <ListItem.Content>
                    <ListItem.Title style={{color: 'white', width: 'auto'}}>
                      {smslist}
                    </ListItem.Title>
                    {/* <ListItem.Subtitle style={{color: colors.buttonbg}}>
                      {data.phoneNumber}
                    </ListItem.Subtitle> */}
                  </ListItem.Content>
                </ListItem.Swipeable>
              </View>
            )
          })
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: colors.screenbg,
    justifyContent: 'center',
    alignItems: 'center',
    color:colors.white
  },
  textstyles: {
    fontSize: 20,
  },
  inputcomponent: {
    width: '100%',
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputtest: {
    width: '80%',
  },
});
