import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const MyText = ({i, x}) => {
  return (
    <Text key={i} style={styles.myTitle}>
      {x.name}
    </Text>
  );
};

const MyList = ({i, x, onSelection}) => {
  return (
    <TouchableOpacity
      style={styles.myListStyle}
      key={i}
      onPress={() => onSelection(x)}>
      <Text style={styles.myTextStyle}>{x.name}</Text>
    </TouchableOpacity>
  );
};

const Footer = ({users}) => {
  const [select, setSelect] = useState(null);
  //console.log('users', users)

  const onSelection = (x) => {
    setSelect(x.name);
  };

  return (
    <View>
      <Text style={{fontWeight: 'bold', fontSize: 38}}>{select}</Text>
      {/* {users.length > 0 &&
        users.map((x, i) => {
          return <MyList key={i} i={i} x={x} onSelection={onSelection} />;
        })} */}
    </View>
  );
};

export default Footer;

const styles = StyleSheet.create({
  myTitle: {
    fontSize: 40,
    color: 'red',
  },
  myListStyle: {
    padding: 10,
    marginTop: 3,
    backgroundColor: '#d9f9b1',
    alignItems: 'center',
  },
  myTextStyle: {
    color: '#4f603c',
  },
});
