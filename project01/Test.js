import React from 'react';
import {View, Text} from 'react-native';
import Logo from './components/Logo';
import Footer from './components/Footer';
import MyInput from './components/MyInput';

const Test = () => {
  const users = [
    {id: 1, name: 'thnpp'},
    {id: 2, name: 'pp'},
    {id: 3, name: 'chng'},
    {id: 4, name: 'mvb'},
  ];
  return (
    <View>
      <Logo />
      <MyInput />
    </View>
  );
};

export default Test;
