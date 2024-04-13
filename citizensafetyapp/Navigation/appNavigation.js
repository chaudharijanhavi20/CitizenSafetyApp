import React, { useEffect, useState } from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/Homescreen.js';
import OnboardingScreen from '../screens/Onboardingscreen.jsx';
import { getItem } from '../utils/asyncStorage.js';
import Homeloading from '../screens/loading/homeloading.jsx';
import Urlfraud from '../screens/Functionality/Urlfraud.jsx';
import Numfraud from '../screens/Functionality/Numfraud.jsx';
import Smsfraud from '../screens/Functionality/Smsfraud.jsx';
import Tempfraud from '../screens/Functionality/Tempfraud.jsx';
import Walletfraud from '../screens/Functionality/Walletfraud.jsx';
import Upifraud from '../screens/Functionality/Upifraud.jsx';


const Stack = createNativeStackNavigator();


export default function AppNavigation() {

  const [showOnboarding, setShowOnboarding] = useState(null);
  useEffect(() => {
    checkIfAlreadyOnboarded();
  }, [])

  const checkIfAlreadyOnboarded = async () => {
    let onboarded = await getItem('onboarded');
    if (onboarded == 1) {
      // hide onboarding
      setShowOnboarding(false);
    } else {
      // show onboarding
      setShowOnboarding(true);
    }
  }

  if (showOnboarding == null) {
    return null;
  }

  const HomeStack = createNativeStackNavigator();
  function HomeStackScreen() {
    return (
      <HomeStack.Navigator initialRouteName='Innerhome'>
        <HomeStack.Screen options={{ headerShown: false }} name="Innerhome" component={HomeScreen} />
        <HomeStack.Screen options={{ headerShown: false }} name='url' component={Urlfraud}/>
        <HomeStack.Screen options={{ headerShown: false }} name='call' component={Numfraud}/>
        <HomeStack.Screen options={{ headerShown: false }} name='sms' component={Smsfraud}/>
        <HomeStack.Screen options={{ headerShown: false }} name='template' component={Tempfraud}/>
        <HomeStack.Screen options={{ headerShown: false }} name='wallet' component={Walletfraud}/>
        <HomeStack.Screen options={{ headerShown: false }} name='upi' component={Upifraud}/>
        {/* <HomeStack.Screen name="Details" component={DetailsScreen} /> */}
      </HomeStack.Navigator>
    );
  }

  if (showOnboarding) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='splash'>
          <Stack.Screen name="splash" options={{ headerShown: false }} component={Homeloading} />
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
          <Stack.Screen name="Homeload" options={{ headerShown: false }} component={HomeStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  } else {
    return (
      <NavigationContainer>
        <Stack.Navigator  initialRouteName='splash'>
          <Stack.Screen name="splash" options={{ headerShown: false }} component={Homeloading} />
          <Stack.Screen name="Onboarding" options={{ headerShown: false }} component={OnboardingScreen} />
          <Stack.Screen name="Homeload" options={{ headerShown: false }} component={HomeStackScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }


}