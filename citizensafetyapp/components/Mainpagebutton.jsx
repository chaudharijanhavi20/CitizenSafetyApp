import {View, Text, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import colors from '../redux/constants/colors';
import {useNavigation} from '@react-navigation/native';

const Mainpagebutton = props => {
  const navigate = useNavigation();
  return (
    <TouchableOpacity
      style={styles.maincomponent}
      onPress={() =>
        navigate.navigate('Homeload', {screen: props.navigationroute})
      }>
      <Image source={props.cardlogo} style={styles.upperimagestyle} />
      <Text style={styles.textstyle}>{props.textdata}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  maincomponent: {
    width: 100,
    height: 110,
    backgroundColor: colors.grayscreenbg,
    borderRadius: 20,
    marginVertical: 16,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  upperimagestyle: {
    width: 60,
    height: 60,
  },
  textstyle: {
    marginTop: 10,
    textAlign: 'center',
    color:colors.white
  },
});
export default Mainpagebutton;
