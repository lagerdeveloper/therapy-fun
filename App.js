import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import AppTabNavigator from './router';

export default class App extends React.Component {
  render() {
    return (
      <AppTabNavigator />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
