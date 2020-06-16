import React, { useEffect } from 'react';
import { View, Text, Animated, Dimensions, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { blue, white_background } from './utils/Color';
import { useSelector } from 'react-redux';

export default function DeckInfo(props) {
  const { id } = props.route.params;

  const opacity = new Animated.Value(0);

  useEffect(() => {
    Animated.timing(opacity, { toValue: 1, duration: 1000 }).start();
  }, []);

  let data = useSelector(state => state);

  const card = data[id];

  return (
    <View style={style.container}>
      <View>
        <Text style={style.title}>{card.title}</Text>
      </View>
      <Animated.Image
        style={{
          height: 280,
          width: Dimensions.get('window').width - 20,
          opacity,
          borderRadius: 20
        }}
        source={{ uri: card.image }}
      />
      <View>
        <Text style={style.cardno}>
          {card.questions.length === 1
            ? `${card.questions.length} Card`
            : `${card.questions.length} Cards`}
        </Text>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.navigate('Quiz', { id: card.title })}
        >
          <Text style={style.btn}>Start Quiz</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            props.navigation.navigate('Add Question', { id: card.title })
          }
        >
          <Text style={style.btn}>New Card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  btn: {
    padding: 10,
    backgroundColor: blue,
    color: white_background,
    width: 100,
    marginHorizontal: 'auto',
    marginVertical: 5,
    textAlign: 'center'
  },
  title: {
    padding: 10,
    fontSize: 24
  },
  cardno: {
    padding: 10,
    fontSize: 18
  }
});
