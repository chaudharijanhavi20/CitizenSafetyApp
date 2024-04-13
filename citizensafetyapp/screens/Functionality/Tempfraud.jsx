import {View, Text, StyleSheet, Alert} from 'react-native';
import React, {useState} from 'react';
import colors from '../../redux/constants/colors';
import {Smsclassifier} from '../api/functions';
import {Button, Input} from '@rneui/themed';

export default function Tempfraud() {
  const [smsinput, setsmsinput] = useState('');
  const handlesmsinput = async () => {
    console.log('validurlscore');
    let fraudsmsscore, validsmsscore;
    Smsclassifier({inputs: smsinput}).then(response => {
      console.log(response);
      if (response[0][0].label === 'LABEL_0') {
        fraudsmsscore = response[0][1].score;
        validsmsscore = response[0][0].score;
      } else {
        fraudsmsscore = response[0][0].score;
        validsmsscore = response[0][1].score;
      }
      if (fraudsmsscore > validsmsscore && fraudsmsscore > 0.9) {
        Alert.alert('Fraud sms found');
      } else if (fraudsmsscore > validsmsscore) {
        Alert.alert('Found to be suspicious');
      } else {
        Alert.alert('Safe to proceed');
      }
      setsmsinput('');
    });
  };
  return (
    <View style={styles.component}>
      <Text style={styles.textstyles}>Fraud SMS Tester</Text>
      <View style={styles.inputcomponent}>
        <Input
          placeholder="Paste your sms templates here.."
          multiline={true}
          style={{color: 'white',height:200,backgroundColor:colors.grayscreenbg,borderRadius:10}}
          containerStyle={{
            width: 300,
          }}
          onChangeText={e => setsmsinput(e)}
          value={smsinput}
        />
        <Button
          title="Check Template"
          buttonStyle={{
            backgroundColor: colors.buttonbg,
            borderRadius: 3,
          }}
          containerStyle={{
            width: 200,
            marginHorizontal: 70,
            marginVertical: 10,
          }}
          onPress={handlesmsinput}
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
    color: colors.white,
  },
  inputcomponent: {
    width: '100%',
    margin: 20,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
