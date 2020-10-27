import React, {useRef, useState} from 'react';
import {StyleSheet, Text, TextInput, View} from 'react-native';

const MyInput = () => {
  const [val, setVal] = useState('...');

  return (
    <View>
      <Text style={{fontSize: 25, fontWeight: 'bold'}}>{val}</Text>
      <TextInput
        placeholder="Input Me!"
        value={val}
        style={{height: 70, borderColor: 'black', borderWidth: 1}}
       onChangeText={text => setVal(text)}
      />
    </View>
  );
};

export default MyInput;

const styles = StyleSheet.create({
    textTitle: {
        fontSize: 28
    }
});
