import AsyncStorage from '@react-native-async-storage/async-storage';

export const StoreData = async (value) => {
  console.log('object v', value);
  try {
    await AsyncStorage.setItem('@Key', JSON.stringify(value));
  } catch (e) {
    throw e;
  }
};

export const getData = async () => {
  try {
    const jsonValue = await AsyncStorage.getItem('@Key');
    console.log('jsonValue', JSON.parse(jsonValue));
    return JSON.parse(jsonValue);
  } catch (e) {
    console.log('e', e)
    throw e;
  }
};
