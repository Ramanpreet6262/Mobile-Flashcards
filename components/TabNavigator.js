import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { View, Text, TouchableOpacity, Dimensions } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Main from './Main';
import CreateNewDeck from './CreateNewDeck';
import { MaterialIcons } from '@expo/vector-icons';
import { black } from './utils/Color';

function MyTabBar({ state, descriptors, navigation }) {
  return (
    <View
      style={{
        height: 50,
        elevation: 5,
        justifyContent: 'space-evenly',
        flexDirection: 'row',
        alignItems: 'center'
      }}
    >
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key
          });
        };

        return (
          <View
            key={index}
            style={{ width: Dimensions.get('window').width / 2 }}
          >
            <TouchableOpacity
              accessibilityRole='button'
              accessibilityStates={isFocused ? ['selected'] : []}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              onPress={onPress}
              onLongPress={onLongPress}
            >
              <MaterialIcons
                style={{ textAlign: 'center' }}
                name={label.toLowerCase()}
                size={32}
                color={black}
              />
              <Text
                style={{
                  color: isFocused ? '#673ab7' : '#222',
                  textAlign: 'center'
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
}

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName='Main'
        tabBar={props => <MyTabBar {...props} />}
      >
        <Tab.Screen name='Home' component={Main} />
        <Tab.Screen name='Add' component={CreateNewDeck} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
