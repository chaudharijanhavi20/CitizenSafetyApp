import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import colors from '../../redux/constants/colors';
import {Button, Input} from '@rneui/themed';
import {query} from '../api/functions';

export default function Urlfraud() {
  const [urlinput, seturlinput] = useState('');
  const handleurlinput = async () => {
    console.log('validurlscore');
    let fraudsmsscore, validsmsscore;
    try {
      query({inputs: urlinput}).then(response => {
        console.log(response);
        if (response[0][0].label === 'BENIGN') {
          fraudsmsscore = response[0][1].score;
          validsmsscore = response[0][0].score;
        } else {
          fraudsmsscore = response[0][0].score;
          validsmsscore = response[0][1].score;
        }
        if (fraudsmsscore > validsmsscore && fraudsmsscore > 0.95) {
          Alert.alert('Fraud Url found');
        } else if (fraudsmsscore > validsmsscore) {
          Alert.alert('Found to be suspicious');
        } else {
          Alert.alert('Safe to proceed');
        }
        seturlinput("")
      });
    } catch (error) {
      Alert.alert("Please wait for Few seconds to load model first time")
    }
  };
  return (
    <View style={styles.component}>
      <Text style={styles.textstyles}>Url Fraud Tester</Text>
      <View style={styles.inputcomponent}>
        <Input
          placeholder="Paste your urls here.."
          style={{color: 'white'}}
          containerStyle={{
            width: 300,
          }}
          keyboardType="url"
          onChangeText={e => seturlinput(e)}
          value={urlinput}
        />
        <Button
          title="Check Url"
          buttonStyle={{
            backgroundColor: colors.buttonbg,
            borderRadius: 3,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 70,
            marginVertical: 10,
          }}
          onPress={handleurlinput}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  component: {
    flex: 1,
    backgroundColor: colors.screenbg,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textstyles: {
    fontSize: 40,
    color:colors.white
  },
  inputcomponent: {
    width: '100%',
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});