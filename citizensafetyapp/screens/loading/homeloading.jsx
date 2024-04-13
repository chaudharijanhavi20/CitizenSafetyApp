import React, { useRef, useEffect } from 'react';
import { Button, StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';
import colors from '../../redux/constants/colors';
function Homeloading({navigation}) {
    const animation = useRef(null);
    setTimeout(()=>{
      navigation.replace('Onboarding')
  },2500  )
  return (
    <View style={styles.container}>
      <LottieView
        autoPlay
        ref={animation}
        style={{
          width: 400,
          height: 500,
        }}
        // Find more Lottie files at https://lottiefiles.com/featured
        source={require("../../assets/loadinganimation.json")}
      />
    </View>
  );
}

const styles=StyleSheet.create({
  container:{
    flex:1,
    justifyContent:"center",
    alignItems:"center",
    backgroundColor:colors.screenbg
  }
})

export default Homeloading;
