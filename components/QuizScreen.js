import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { green, white_background, black, red } from './utils/Color';
import {
  clearLocalNotification,
  setLocalNotification
} from './helper/Notification';

export default function Quiz(props) {
  const [cardIndex, setCardIndex] = useState(0);
  const [marks, setMarks] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [showresult, setShowResult] = useState(false);

  const { id } = props.route.params;

  let card = useSelector(state => state);

  const question = card[id].questions;

  const length = question.length;

  const handleAnswer = e => {
    if (e === question[cardIndex].answer) {
      let newScore = marks + 1;
      setMarks(newScore);
    }

    let newIndex = cardIndex + 1;

    if (newIndex < length) {
      setCardIndex(newIndex);
    }

    if (newIndex === length) {
      setShowResult(true);
      clearLocalNotification().then(setLocalNotification);
    }

    setShowAnswer(false);
  };

  const resetQuiz = () => {
    setMarks(0);
    setCardIndex(0);
    setShowAnswer(false);
    setShowResult(false);
  };

  if (question.length === 0) {
    return (
      <View style={style.container}>
        <Text>You don't have any card. Please add some to start the quiz</Text>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity
            onPress={() =>
              props.navigation.navigate('Add Question', { id: id })
            }
          >
            <Text style={style.correct}>Add Card</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={style.container}>
      <View style={{ position: 'absolute', top: 10, left: 5 }}>
        <Text>
          {cardIndex + 1} / {length} question
        </Text>
      </View>
      <View style={style.card}>
        <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
          {question[cardIndex].question}
        </Text>
        <View>
          {showAnswer ? (
            <TouchableOpacity onPress={() => setShowAnswer(!showAnswer)}>
              <Text style={{ color: green, marginTop: 10, fontSize: 15 }}>
                Hide Answer
              </Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={() => setShowAnswer(!showAnswer)}>
              <Text style={{ color: red, marginTop: 10, fontSize: 15 }}>
                View Answer
              </Text>
            </TouchableOpacity>
          )}

          {showAnswer && (
            <Text style={{ fontSize: 16, marginTop: 10 }}>
              {question[cardIndex].details}
            </Text>
          )}
        </View>
        {cardIndex < length && !showresult ? (
          <View style={style.buttons}>
            <View>
              <TouchableOpacity onPress={() => handleAnswer('correct')}>
                <Text style={style.correct}>Correct</Text>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity onPress={() => handleAnswer('Incorrect')}>
                <Text style={style.inCorrect}>Incorrect</Text>
              </TouchableOpacity>
            </View>
          </View>
        ) : (
          <View style={{ marginTop: 15 }}>
            <TouchableOpacity onPress={() => resetQuiz()}>
              <Text style={style.correct}>Reset</Text>
            </TouchableOpacity>
          </View>
        )}

        {showresult && (
          <View style={{ marginTop: 10 }}>
            <Text style={{ fontSize: 17 }}>
              Your marks is{' '}
              <Text style={{ color: green, fontWeight: 'bold', fontSize: 17 }}>
                {((marks / length) * 100).toFixed(2)}
              </Text>{' '}
              %
            </Text>
          </View>
        )}
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
  card: {
    width: Dimensions.get('window').width - 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    alignSelf: 'center'
  },
  buttons: {
    marginTop: 20,
    width: Dimensions.get('window').width - 20,
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexDirection: 'row'
  },
  correct: {
    padding: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: green,
    color: white_background,
    borderColor: black,
    borderStyle: 'solid',
    borderWidth: 1,
    alignSelf: 'flex-start'
  },
  inCorrect: {
    padding: 10,
    paddingHorizontal: 20,
    textAlign: 'center',
    backgroundColor: red,
    color: white_background,
    borderColor: black,
    borderStyle: 'solid',
    borderWidth: 1,
    alignSelf: 'flex-end'
  }
});
