import {View, Text, StyleSheet, Image} from 'react-native';
import React, { useEffect } from 'react';
import colors from '../redux/constants/colors';
import mainlog from '../assets/mainlog.jpg'
import Mainpagebutton from '../components/Mainpagebutton';
import upi from '../assets/upi.png'
import sms from '../assets/sms.png'
import smstemp from '../assets/smstemp.png'
import url from '../assets/url.png'
import spam from '../assets/spam.png'
import bitcoin from '../assets/bitcoin.png'
const Mainpage = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topperelement}>
        <View style={styles.innertop}>
          <Text style={styles.uppertextsyle}>Welcome Janhavi</Text>
          <Text style={styles.uppertextsyle}>Want to check something Manually?</Text>
        </View>
        <View style={styles.innertopbottom}>
          <Image source={mainlog} style={styles.upperimagestyle}/>
        </View>
      </View>
      <View style={styles.bottomelement}>
        <Mainpagebutton navigationroute={"url"} textdata={"Fraud Url"} cardlogo={url}/>
        <Mainpagebutton navigationroute={"call"} textdata={"Spam call"} cardlogo={spam}/>
        <Mainpagebutton navigationroute={"sms"} textdata={"Fraud sms"} cardlogo={sms}/>
        <Mainpagebutton navigationroute={"template"} textdata={"Invalid template"} cardlogo={smstemp}/>
        <Mainpagebutton navigationroute={"wallet"} textdata={"Fraud wallet"} cardlogo={bitcoin}/>
        <Mainpagebutton navigationroute={"upi"} textdata={"Fraud Upi"} cardlogo={upi}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.screenbg,
  },
  topperelement:{
    flex:4,
    flexDirection:"column",
  },
  innertop:{
    margin:20,
  },
  innertopbottom:{
    width:'auto',
    height:"100%",
    flex:1,
    alignItems:"center",
    // justifyContent:"center",
  },
  uppertextsyle:{
    color:colors.white,
    fontSize:20
  },
  upperimagestyle:{
    width:300,
    height:200,
    borderRadius:10,
    margin:"auto"
  },
  bottomelement:{
    flex:5,
    flexDirection:"row",
    flexWrap:"wrap",
    justifyContent:"space-evenly",
    color:"white",
    padding:2
  }
});
export default Mainpage;
