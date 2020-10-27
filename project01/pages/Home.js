import React from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';

const Home = ({navigation}) => {
    
  return (
    <View style={styles.myHome}>
      <Text>Home</Text>
      <Button title="Go to About" onPress={() =>navigation.navigate('About', {
          Id: 56,
          Token: "sdlkgfhdjgslkjhdfljfdhgl;dfkjhfds"
      })}></Button>
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
