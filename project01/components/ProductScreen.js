import React, {useState, useEffect, useCallback, useRef} from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  ScrollView,
  SafeAreaView,
} from 'react-native';

import axios from 'axios';

import Ionicons from 'react-native-vector-icons/Ionicons';
import {useFocusEffect} from '@react-navigation/native';

import {
  Container,
  Header,
  Content,
  List,
  ListItem,
  Thumbnail,
  Text,
  Left,
  Body,
  Right,
  Button,
  Badge,
  Spinner,
  Bage,
} from 'native-base';

import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';

const IoniconsHeaderButton = (props) => (
  // the `props` here come from <Item ... />
  // you may access them and pass something else to `HeaderButton` if you like
  <HeaderButton
    IconComponent={Ionicons}
    iconSize={30}
    color="white"
    {...props}
  />
);

const ProductScreen = ({navigation}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'สินค้า',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={IoniconsHeaderButton}>
          <Item
            title="menu"
            iconName="menu"
            onPress={() => navigation.openDrawer()}
          />
        </HeaderButtons>
      ),
    });
  }, [navigation]);

  const [product, setProduct] = useState([]);
  const [isLoad, setIsLoad] = useState(false);
  const [error, setError] = useState(null);
  const cancelToken = useRef(null);

  const getData = async () => {
    try {
      setIsLoad(true);
      const res = await axios.get('https://api.codingthailand.com/api/course', {
        cancelToken: cancelToken.current.token,
      });
      // alert(JSON.stringify(res.data.data));
      setProduct(res.data.data);
      setIsLoad(false);
    } catch (er) {
      setIsLoad(false);
      setError(er);
    }
  };

  // useEffect(() => {
  //   getData();
  // }, []);
  //let cancelToken;

  useFocusEffect(
    useCallback(() => {
      cancelToken.current = axios.CancelToken.source();

      getData();

      return () => {
        cancelToken.current.cancel();
      };
    }, []),
  );

  if (error) {
    return (
      <View>
        <Text>Has Error!</Text>
      </View>
    );
  }

  return (
    <SafeAreaView>
      {isLoad && <Spinner color="#007AFF" />}
      <FlatList
        data={product}
        keyExtractor={(item, index) => item.id.toString()}
        renderItem={({item}) => (
          <ListItem
            thumbnail
            onPress={() => navigation.navigate('Detail', {item})}>
            <Left>
              <Thumbnail square source={{uri: item.picture}} />
            </Left>
            <Body>
              <Text>{item.title}</Text>
              <Text note numberOfLines={1}>
                {item.detail}
              </Text>
            </Body>
            <Right>
              <Badge danger>
                <Text>{item.view}</Text>
              </Badge>
            </Right>
          </ListItem>
        )}
        onRefresh={getData}
        refreshing={isLoad}
      />
    </SafeAreaView>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
