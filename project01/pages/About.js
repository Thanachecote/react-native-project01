import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const About = ({route}) => {
  const {Id, Token} = route.params;
  return (
    <View style={styles.myAbout}>
      <Text>About</Text>
      <Text>Id: {JSON.stringify(Id)}</Text>
      <Text>Token: {JSON.stringify(Token)}</Text>
    </View>
  );
};

export default About;

const styles = StyleSheet.create({
  myAbout: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
