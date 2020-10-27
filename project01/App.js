import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Test from './Test';
import {View, Text, StyleSheet, Button} from 'react-native';
import Home  from './pages/Home'
import About  from './pages/About'


const {Navigator, Screen} = createStackNavigator();
const navScreenStyle = {
  headerStyle: {
    backgroundColor: '#1572E8',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold'
  },
}

const App = () => {
  return (
    <NavigationContainer>
      <Navigator initialRouteName="Home" screenOptions={navScreenStyle}>
        <Screen name="Home" component={Home} options={{
          title: "Home",
        }} />
        <Screen name="About" component={About} />
      </Navigator>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  myHomeScreen: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
