import {View, Text, StyleSheet, ScrollView, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../redux/constants/colors';
import { useNavigation } from '@react-navigation/native';
import { list } from './data';
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

const Infopage = () => {
  const navigate = useNavigation()
  return (
    <View style={styles.container}>
      <Text
        style={{fontSize: 40, textAlign: 'center', margin: 20, color: '#fff'}}>
        Cyber Fraud Solution
      </Text>
      <ScrollView>
        {list.map((data,index) => {
          return (
            <TouchableOpacity key={index} style={styles.cardcomponents} onPress={()=>navigate.navigate('innerInfo', {data:data})}>
              <Text style={{color: '#fff',fontSize:20,textAlign:"center",flex:5}}>{data.title}</Text>
              <MaterialCommunityIcons style={{flex:1}} name="page-next-outline" color="white" size={30} />
            </TouchableOpacity>
          );
        })}
        <View style={{marginBottom:70}}>

        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems:"center",
    backgroundColor: colors.screenbg,
  },
  text: {
    fontSize: 100,
    fontStyle: 'italic',
  },
  cardcomponents: {
    flex: 1,
    flexDirection:"row",
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.buttonbg,
    marginHorizontal: 20,
    marginVertical:10,
    padding: 20,
    borderRadius: 10,
  },
});
export default Infopage;
