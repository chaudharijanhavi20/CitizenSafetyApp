import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import Lottie from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {setItem} from '../utils/asyncStorage';
const {width, height} = Dimensions.get('window');

export default function OnboardingScreen() {
  const navigation = useNavigation();

  const handleDone = async () => {
    navigation.navigate('Homeload');
    setItem('onboarded', '1');
  };

  const doneButton = ({...props}) => {
    return (
      <TouchableOpacity style={styles.doneButton} {...props}>
        <Text>Done</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      <Onboarding
        onDone={handleDone}
        onSkip={handleDone}
        bottomBarHighlight={true}
        DoneButtonComponent={doneButton}
        containerStyles={{paddingHorizontal: 20}}
        pages={[
          {
            backgroundColor: '#111827',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require('../assets/homeanimation.json')}
                  style={{
                    width: width * 0.7,
                    height: width,
                  }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Boost Productivity',
            subtitle: 'Subscribe this channel to boost your productivity level',
          },
          {
            backgroundColor: '#111827',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require('../assets/loading3.json')}
                  style={{
                    width: width * 0.7,
                    height: width,
                  }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Work Seamlessly',
            subtitle: 'Get your work done seamlessly without interruption',
          },
          {
            backgroundColor: '#111827',
            image: (
              <View style={styles.lottie}>
                <Lottie
                  source={require('../assets/loading2.json')}
                  style={{
                    width: width * 0.7,
                    height: width,
                  }}
                  autoPlay
                  loop
                />
              </View>
            ),
            title: 'Achieve Higher Goals',
            subtitle:
              'By boosting your productivity we help you to achieve higher goals',
          },
        ]}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  lottie: {
    width: width * 0.7,
    height: width,
    margin: 'auto',
  },
  doneButton: {
    padding: 20,
    color: 'white',
  },
});
