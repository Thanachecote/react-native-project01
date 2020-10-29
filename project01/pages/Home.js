import React from 'react';
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
      <Item title={title} iconName={iconName} onPress={() => navigation.navigate('Register')} />
    </HeaderButtons>
  );
};

const HomeScreen = ({navigation}) => {
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

  return (
    <View>
      <Text>Id: 0</Text>
      <Text>Token: null</Text>
    </View>
  );
};

const MyIcon = ({navigation}) => {
  return (
    <Icon.Button
      name="home"
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
  return (
    <View style={styles.myHome}>
      <Text>Home</Text>
      <MyIcon navigation={navigation} />
      <HomeScreen navigation={navigation} />
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
