import React, {useState, useLayoutEffect, useContext} from 'react';
import {StyleSheet, View} from 'react-native';
import {
  Container,
  Header,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button,
  Text,
  Icon,
} from 'native-base';
import {Formik, Field} from 'formik';
import * as Yup from 'yup';

import axios from 'axios';

import {HeaderButtons, HeaderButton} from 'react-navigation-header-buttons';

import {StoreData, getData} from '../data/ProvideContext';
import {StoreContext} from '../data/StoreContext/StoreProvider';

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

const validateSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email')
    .required('Please Enter Your Email!'),
  password: Yup.string()
    .min(3, 'Please Enter Your Password Over 3 Characters!')
    .required('Please Enter Your Password!'),
});

const LoginScreen = ({navigation}) => {
  const {profile, setProfile} = useContext(StoreContext);

  axios.defaults.baseURL = 'https://api.codingthailand.com';

  const Authorize = async (token, navigation) => {
    //console.log('token', token)
    await axios
      .get('/api/profile', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log('res.data 2', res.data);
        StoreData(res.data.data.user);
        setProfile(res.data.data.user);
        navigation.navigate('Home');
      })
      .catch((er) => {
        console.log('er 2', er);
      });
  };

  const GetSignIn = async (params, setSubmitting, navigation) => {
    await axios
      .post('api/login', params)
      .then((res) => {
        //alert(res.data.access_token);
        //navigation.navigate('Home');
        console.log('res.data.access_token', res.data);
        Authorize(res.data.access_token, navigation);

        //StoreData(res.data);
      })
      .catch((er) => {
        //alert(er.response.data.errors.email[0]);
        console.log('er 1', er);

        //alert(er.response.data.message);
      })
      .finally(() => setSubmitting(false));
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Login',
    });
  }, [navigation]);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={validateSchema}
      onSubmit={(values, {setSubmitting}) => {
        // same shape as initial values
        console.log('values', values);
        let params = {
          email: 'ake@gmail.com',
          password: '123456',
        };
        GetSignIn(params, setSubmitting, navigation);
      }}>
      {({
        errors,
        touched,
        handleChange,
        values,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <Form>
          <Item fixedLabel error={errors.email && touched.email ? true : false}>
            <Label style={{fontWeight: 'bold'}}>Email:</Label>
            <Input
              name="email"
              value={values.email}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              keyboardType={'email-address'}
            />
            {errors.email && touched.email && (
              <Icon name="close-circle" color="white" />
            )}
          </Item>
          {errors.email && touched.email && (
            <Item>
              <Label style={{color: 'red'}}>{errors.email}</Label>
            </Item>
          )}
          <Item
            fixedLabel
            error={errors.password && touched.password ? true : false}>
            <Label style={{fontWeight: 'bold'}}>Password:</Label>
            <Input
              name="password"
              value={values.password}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              keyboardType="number-pad"
              secureTextEntry={true}
            />
            {errors.password && touched.password && (
              <Icon name="close-circle" color="white" />
            )}
          </Item>
          {errors.password && touched.password && (
            <Item>
              <Label style={{color: 'red'}}>{errors.password}</Label>
            </Item>
          )}

          <Button
            large
            block
            style={{marginTop: 30}}
            primary
            disabled={isSubmitting}
            onPress={handleSubmit}>
            <Text>Sign In!</Text>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({});
