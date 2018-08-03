import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import configureReduxStore from './configureReduxStore';
import AppTabNavigator from './router';

const { store, persistor } = configureReduxStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <AppTabNavigator />
        </PersistGate>
      </Provider>
    );
  }
}
