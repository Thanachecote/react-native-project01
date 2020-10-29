import React, {useCallback, useState, useLayoutEffect} from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  FlatList,
  VirtualizedList,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Card,
  CardItem,
  Text,
  Body,
  Spinner,
  ListItem,
  Left,
  Right,
  Badge,
} from 'native-base';
import {Image} from 'react-native';
import axios from 'axios';
import {useFocusEffect} from '@react-navigation/native';

import {
  HeaderButtons,
  HeaderButton,
  Item,
} from 'react-navigation-header-buttons';

axios.defaults.baseURL = 'https://api.codingthailand.com';

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

const DetailScreen = ({route, navigation}) => {
  const [loading, setLoading] = useState(false);
  const [detail, setDetail] = useState([]);

  const {item} = route.params;

  const getDatabyId = async (item) => {
    setLoading(true);
    axios
      .get(`/api/course/${item.id.toString()}`)
      .then((res) => {
        setDetail(res.data.data);
        setLoading(false);
      })
      .catch((er) => {
        console.log('er', er);
      });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: item.title,
    });
  }, [navigation, item]);

  useFocusEffect(
    useCallback(() => {
      getDatabyId(item);
    }, [item]),
  );

  return (
    <View>
      {loading && <Spinner color="#007AFF" />}
      <FlatList
        data={detail}
        keyExtractor={(item, index) => item.ch_id.toString()}
        renderItem={({item}) => (
          <ListItem thumbnail>
            <Body>
              <Text style={{fontWeight: 'bold'}}>course:{item.course_id}</Text>
              <Text>{item.ch_title}</Text>
            </Body>
            <Right>
              <Badge danger>
                <Text>{item.ch_dateadd}</Text>
              </Badge>
            </Right>
          </ListItem>
        )}
        onRefresh={() => getDatabyId(item)}
        refreshing={loading}
      />
    </View>
  );
};

export default DetailScreen;

const styles = StyleSheet.create({});
