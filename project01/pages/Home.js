import React, {useState, useEffect, useContext} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  HeaderButtons,
  HeaderButton,
  Item,
  HiddenItem,
  OverflowMenu,
} from 'react-navigation-header-buttons';
import Logo from '../components/LogoMain';
import {getData} from '../data/ProvideContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {StoreContext} from '../data/StoreContext/StoreProvider';

const IoniconsHeaderButton = (props) => (
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={23}
    color="white"
    {...props}
  />
);

const HeaderBtn = ({title, iconName, desp, navigation}) => {
  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item
        title={title}
        iconName={iconName}
        onPress={() => navigation.openDrawer()}
      />
    </HeaderButtons>
  );
};

const HeaderBtnAlert = ({title, iconName, desp, navigation}) => {
  return (
    <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
      <Item
        title={title}
        iconName={iconName}
        onPress={() => navigation.navigate('Register')}
      />
    </HeaderButtons>
  );
};

const HomeScreen = ({navigation, setProfile, profile}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => <Logo />,
      headerRight: () => (
        <HeaderBtn
          title="menu"
          iconName="menu"
          desp="Alert Menu!"
          navigation={navigation}
        />
      ),
      headerLeft: () => (
        <HeaderBtnAlert
          title="register"
          iconName="person-add"
          desp="Alert Regidter"
          navigation={navigation}
        />
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const getProfile = async () => {
      const jsonValue = await AsyncStorage.getItem('@Key');

      if (jsonValue) {
        setProfile(JSON.parse(jsonValue));
        console.log('profile home', profile);
      }
    };

    getProfile();
  }, []);

  return (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 25}}>
        Welcome to {profile && profile.name}
      </Text>
    </View>
  );
};

const MyIcon = ({navigation}) => {
  return (
    <Icon.Button
      name="user"
      background="#1572E8"
      onPress={() =>
        navigation.navigate('About', {
          Id: 56,
          Token: 'sdlkgfhdjgslkjhdfljfdhgl;dfkjhfds',
        })
      }>
      Go to About
    </Icon.Button>
  );
};

const MyIconW = ({navigation}) => {
  return (
    <Icon.Button
      name="home"
      background="#1572E8"
      onPress={() => navigation.navigate('Register')}>
      Go to Register
    </Icon.Button>
  );
};

const Home = ({navigation}) => {
  const {profile, setProfile} = useContext(StoreContext);

  return (
    <View style={styles.myHome}>
      <Ionicons name="home" size={80} color="#1572E8" />
      <MyIcon navigation={navigation} />
      <HomeScreen
        navigation={navigation}
        setProfile={setProfile}
        profile={profile}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  myHome: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
