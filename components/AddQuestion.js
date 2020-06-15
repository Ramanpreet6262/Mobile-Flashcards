import React, { useState } from 'react';
import {
  View,
  Text,
  KeyboardAvoidingView,
  Dimensions,
  StyleSheet,
  Picker,
  Button,
  AsyncStorage,
  ScrollView,
  TextInput
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NewQuestion } from './redux/actions';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { black, blue, white_background } from './utils/Color';

export default function NewwQuestion(props) {
  const [QuesTitle, setQuesTitle] = useState('');
  const [answer, setAnswer] = useState('');
  const [result, setResult] = useState('correct');
  const dispatch = useDispatch();
  const { id } = props.route.params;

  let cards = useSelector(state => state);

  const handleSubmit = () => {
    cards[id].questions.push({
      question: QuesTitle,
      details: answer,
      answer: result
    });

    AsyncStorage.setItem('cards', JSON.stringify({ ...cards })).then(() => {
      dispatch(
        NewQuestion({
          key: id,
          questions: {
            question: QuesTitle,
            details: answer,
            answer: result
          }
        })
      );
    });

    alert('Question Added');
    setResult('correct');
    setAnswer('');
    setQuesTitle('');
    props.navigation.navigate('Details');
  };

  return (
    <ScrollView>
      <View style={style.container}>
        <Text>Add New Question here</Text>
        <KeyboardAvoidingView behavior='padding'>
          <TextInput
            style={style.QuesTitle}
            placeholder="Enter Question's title Here"
            value={QuesTitle}
            onChangeText={e => {
              setQuesTitle(e);
            }}
          />
          <TextInput
            style={style.textInput}
            placeholder='Fill answer here'
            value={answer}
            onChangeText={e => {
              setAnswer(e);
            }}
          />
        </KeyboardAvoidingView>
        <View>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>Set result</Text>
          <Picker
            selectedValue={result}
            onValueChange={(itemValue, itemIndex) => setResult(itemValue)}
            style={{ width: Dimensions.get('window').width - 20 }}
          >
            <Picker.Item label='correct' value='correct' />
            <Picker.Item label='Incorrect' value='Incorrect' />
          </Picker>
        </View>
        <View>
          <TouchableOpacity onPress={handleSubmit}>
            <Text>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
  textInput: {
    borderColor: black,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 200,
    width: Dimensions.get('window').width - 40,
    marginBottom: 20,
    marginTop: 20,
    justifyContent: 'flex-start',
    textAlign: 'left',
    alignItems: 'flex-start',
    alignContent: 'flex-start'
  },
  QuesTitle: {
    borderColor: black,
    borderStyle: 'solid',
    borderWidth: 1,
    height: 50,
    width: Dimensions.get('window').width - 40,
    marginBottom: 20,
    marginTop: 20
  }
});
