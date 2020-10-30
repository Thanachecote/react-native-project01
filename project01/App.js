import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {View, Text, StyleSheet, Button} from 'react-native';
import Home from './pages/Home';
import About from './pages/About';
import MenuScreen from './components/MenuScreen';
import ProductScreen from './components/ProductScreen';
import DetailScreen from './components/DetailScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';

import { StoreProvider } from './data/StoreContext/StoreProvider';

const {Navigator, Screen} = createStackNavigator();
const Drawer = createDrawerNavigator();

const navScreenStyle = {
  headerStyle: {
    backgroundColor: '#1572E8',
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontWeight: 'bold',
  },
};

const HomeStack = () => {
  return (
    <Navigator screenOptions={navScreenStyle}>
      <Screen
        name="Home"
        component={Home}
        options={{
          title: 'Home',
        }}
      />
      <Screen name="About" component={About} />
      <Screen name="Register" component={RegisterScreen} />
      <Screen name="Login" component={LoginScreen} />
    </Navigator>
  );
};

const ProductStack = () => {
  return (
    <Navigator screenOptions={navScreenStyle}>
      <Screen name="Product" component={ProductScreen} />
      <Screen name="Detail" component={DetailScreen} />
    </Navigator>
  );
};

const App = () => {
  return (
    <StoreProvider>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="HomeStack"
          drawerPosition="left"
          drawerContent={(props) => <MenuScreen {...props} />}>
          <Drawer.Screen name="HomeStack" component={HomeStack} />
          <Drawer.Screen name="ProductStack" component={ProductStack} />
        </Drawer.Navigator>
      </NavigationContainer>
    </StoreProvider>
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
