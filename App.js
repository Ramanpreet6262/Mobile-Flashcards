import React from 'react';
import { Provider } from 'react-redux';
import MyTabs from './components/TabNavigator';
import store from './components/redux';

export default function App() {
  return (
    <Provider store={store}>
      <MyTabs />
    </Provider>
  );
}
