import React, {useState} from 'react';
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

const validateSchema = Yup.object().shape({
  name: Yup.string().required('Please Enter Your Name!'),
  email: Yup.string()
    .email('Invalid email')
    .required('Please Enter Your Email!'),
  password: Yup.string()
    .min(3, 'Please Enter Your Password Over 3 Characters!')
    .required('Please Enter Your Password!'),
});

const RegisterScreen = ({navigation}) => {
  const [user, setUser] = useState(null);

  axios.defaults.baseURL = 'https://api.codingthailand.com';
  const GetSignIn = (params, setSubmitting, navigation) => {
    axios
      .post('/api/register', params)
      .then((res) => {
        //alert(res.data.message);
        navigation.navigate('Home')
      })
      .catch((er) => {
        alert(er.response.data.errors.email[0]);
      })
      .finally(() => setSubmitting(false));
  };

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        password: '',
      }}
      validationSchema={validateSchema}
      onSubmit={(values, {setSubmitting}) => {
        // same shape as initial values
        console.log('values', values);
        let user = {
          name: 'ake',
          email: 'jj2244474xxx49@gmail.com',
          password: '123456',
        };
        GetSignIn(user, setSubmitting, navigation);
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
          <Item fixedLabel error={errors.name && touched.name ? true : false}>
            <Label style={{fontWeight: 'bold'}}>Name:</Label>
            <Input
              name="name"
              value={values.name}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
            />
            {errors.name && touched.name && (
              <Icon name="close-circle" color="white" />
            )}
          </Item>
          {errors.name && touched.name && (
            <Item>
              <Label style={{color: 'red'}}>{errors.name}</Label>
            </Item>
          )}
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
            <Text>Sign Up!</Text>
          </Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
