import React, {useContext, useEffect, useState} from 'react';
import {
  StyleSheet,
  View,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import {
  Container,
  Header,
  Content,
  Button,
  ListItem,
  Text,
  Icon,
  Left,
  Body,
  Right,
  Switch,
} from 'native-base';

import {getData} from '../data/ProvideContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {StoreContext} from '../data/StoreContext/StoreProvider';

const MenuScreenList = ({i, icon, navigation, name, params}) => {
  return (
    <TouchableOpacity
      style={styles.myListStyle}
      key={i}
      onPress={() => navigation.navigate(name, params)}>
      <View style={{color: 'black', fontWeight: 'bold', fontSize: 20}}>
        <IconFont name={icon} size={20} color="black" />
        <Text>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const pg = [
  {
    i: 1,
    name: 'Home',
    icon: 'home',
    params: null,
  },
  {
    i: 2,
    name: 'About',
    icon: 'user-alt',
    params: {
      Id: 56,
      Token: 'sdlkgfhdjgslkjhdfljfdhgl;dfkjhfds',
    },
  },
];

const MenuScreen = ({navigation}) => {
  const {profile, setProfile} = useContext(StoreContext);

  useEffect(() => {
    const getProfile = async () => {
      const jsonValue = await AsyncStorage.getItem('@Key');

      if (jsonValue) {
        setProfile(JSON.parse(jsonValue));
        console.log('profile', profile);
      }
    };

    getProfile();
  }, []);

  const getLogout = async (navigation) => {
    await AsyncStorage.removeItem('@Key');
    setProfile(null);
    navigation.closeDrawer();
  };

  return (
    <ScrollView>
      <View>
        <ImageBackground
          style={styles.myImgScreen}
          source={{
            uri:
              'https://images.pexels.com/photos/1738762/pexels-photo-1738762.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940',
          }}>
          <Text style={styles.myTextScree}>เมนูหลัก</Text>
          <Text style={styles.myTextScree}>
            {profile && `${profile.name} (${profile.role})`}
          </Text>
          <Text style={styles.myTextScree}>{profile && profile.email}</Text>
        </ImageBackground>
        <Content>
          <ListItem
            icon
            style={styles.myListItem}
            onPress={() => navigation.navigate('HomeStack')}>
            <Left>
              <Button style={{backgroundColor: '#007AFF'}}>
                <Icon active name="home" />
              </Button>
            </Left>
            <Body>
              <Text>Home</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          <ListItem
            icon
            style={styles.myListItem}
            onPress={() => {
              navigation.navigate('ProductStack');
            }}>
            <Left>
              <Button style={{backgroundColor: '#007AFF'}}>
                <Icon active name="list-ul" type="FontAwesome" />
              </Button>
            </Left>
            <Body>
              <Text>Product</Text>
            </Body>
            <Right>
              <Icon active name="arrow-forward" />
            </Right>
          </ListItem>
          {profile ? (
            <ListItem
              icon
              style={styles.myListItem}
              onPress={() => {
                getLogout(navigation);
              }}>
              <Left>
                <Button style={{backgroundColor: 'red'}}>
                  <Icon active name="sign-out" type="FontAwesome" />
                </Button>
              </Left>
              <Body>
                <Text>Logout</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          ) : (
            <ListItem
              icon
              style={styles.myListItem}
              onPress={() => {
                navigation.navigate('Login');
              }}>
              <Left>
                <Button style={{backgroundColor: '#007AFF'}}>
                  <Icon active name="sign-in" type="FontAwesome" />
                </Button>
              </Left>
              <Body>
                <Text>Login</Text>
              </Body>
              <Right>
                <Icon active name="arrow-forward" />
              </Right>
            </ListItem>
          )}
        </Content>
      </View>
    </ScrollView>
  );
};

export default MenuScreen;

const styles = StyleSheet.create({
  myImgScreen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: 100,
    width: undefined,
  },
  myTextScree: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },
  myListStyle: {
    padding: 10,
    marginTop: 3,
    backgroundColor: 'white',
    alignItems: 'flex-start',
  },
  myListItem: {
    marginTop: 10,
    marginBottom: 10,
  },
});
