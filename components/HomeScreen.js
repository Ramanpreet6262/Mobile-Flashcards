import React, { useEffect } from 'react';
import {
  ScrollView,
  Image,
  Text,
  View,
  StyleSheet,
  Animated,
  Dimensions
} from 'react-native';
import { _getData } from './utils/_Data';
import { white_background } from './utils/Color';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useDispatch, useSelector } from 'react-redux';
import { GetInitialData } from './redux/actions';
import { setLocalNotification } from './helper/Notification';

const Home = props => {
  const dispatch = useDispatch();

  useEffect(() => {
    setLocalNotification();
    async function fetch() {
      const { cards } = await _getData();
      dispatch(GetInitialData(cards));
    }
    fetch();
  }, []);

  const cards = useSelector(state => state);
  if (!cards || Object.keys(cards).length === 0) {
    return (
      <View style={style.container}>
        <Text>You don't have any deck stored yet!!</Text>
      </View>
    );
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      <View style={style.container}>
        {Object.keys(cards).map(eachKey => {
          const obj = cards[eachKey];
          return (
            <View style={{ marginTop: 40, padding: 10 }} key={eachKey}>
              <TouchableOpacity
                onPress={() =>
                  props.navigation.navigate('Details', { id: obj.title })
                }
              >
                <Image
                  source={{ uri: obj.image }}
                  style={{
                    height: 300,
                    width: Dimensions.get('window').width - 20,
                    borderRadius: 20
                  }}
                />
                <View style={style.absoluteText}>
                  <Text style={{ fontSize: 17 }}>{obj.title}</Text>
                  <Text style={{ fontSize: 17 }}>
                    {obj.questions.length === 1
                      ? `${obj.questions.length} Card`
                      : `${obj.questions.length} Cards`}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: white_background
  },
  absoluteText: {
    padding: 20,
    width: Dimensions.get('window').width / 2,
    backgroundColor: white_background,
    marginTop: -100
  }
});

export default Home;
