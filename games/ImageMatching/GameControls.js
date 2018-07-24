import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Header } from 'react-native-elements';

export default class GameControls extends Component {
  render() {
    const { currentLevel, goToMenu, navigation } = this.props;
    return (
      <Header innerContainerStyles={{ marginTop: 10 }} outerContainerStyles={{ backgroundColor: 'rgb(43,151,219)' }}>
        <TouchableOpacity onPress={goToMenu}>
          <Ionicons name='md-home' color='white' size={24} />
        </TouchableOpacity>
        <Text style={styles.level}>Level {currentLevel.id}</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name='md-arrow-forward' color='white' size={24} />
        </TouchableOpacity>
      </Header>
    );
  }
}

const styles = StyleSheet.create({
  level: {
    color: 'white',
    fontSize: 24,
  },
});
