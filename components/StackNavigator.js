import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import DeckInfo from './DeckInfo';
import Quiz from './QuizScreen';
import NewQuestion from './AddQuestion';

const Stack = createStackNavigator();

export default function StackNavigator() {
  return (
    <Stack.Navigator initialRouteName='Home'>
      <Stack.Screen name='Home' component={HomeScreen} />
      <Stack.Screen name='Details' component={DeckInfo} />
      <Stack.Screen name='Quiz' component={Quiz} />
      <Stack.Screen name='Add Question' component={NewQuestion} />
    </Stack.Navigator>
  );
}
