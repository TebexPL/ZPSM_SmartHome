import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, View, LogBox} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen'
import Devices from './Screens/Devices';
import { setCustomText } from 'react-native-global-props';
LogBox.ignoreLogs(['AsyncStorage']);

function SettingsScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Nothing yet</Text>
    </View>
  );
}


setCustomText({
  style:{
    fontFamily: 'Ubuntu-Medium'
  }
});

const App = () => {
  const Tab = createBottomTabNavigator();

  useEffect(() => {
    SplashScreen.hide();
  }, [])

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarShowLabel: false,
          tabBarIcon: ({focused, color, size}) => {
            return <Text style={{color: focused?'#389cff':'grey'}}>{route.name}</Text>
          }})}>
        <Tab.Screen name="Devices" component={Devices} />
        <Tab.Screen name="Connection" component={SettingsScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );

};


export default App;
