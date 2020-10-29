import React, { useState } from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import Img from '../assets/images/logo.png';

const Logo = () => {
    const [isTitle, setIsTitle] = useState(true)
  const title = 'ทีโอที';
  const isProfile = false
  const profile = {
    name: 'Thanachote Phetploy',
  };

  const onTitle = () => {
      //console.log('isTitle', isTitle)
      //setIsTitle(!isTitle);
      setIsTitle(!isTitle);
  }

  return (
    <View>
      <Text style={styles.title}>
      </Text>
      <Button onPress={onTitle} title={"Press Me"}/>
    </View>
  );
};

export default Logo;

const styles = StyleSheet.create({
  title: {
    color: 'blue',
    fontSize: 36,
  },
});
