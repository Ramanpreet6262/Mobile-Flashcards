import { AsyncStorage } from 'react-native';

export async function _getData() {
  let data = await AsyncStorage.getItem('cards');
  data = await JSON.parse(data);
  return { cards: data };
}

export async function handleData(deck) {
  let data = await AsyncStorage.getItem('cards');
  if (!data) {
    await setInitialData(deck);
  }
  await setInitialData(deck);
  return data;
}
