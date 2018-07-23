import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class GameControls extends Component {
  render() {
    const { currentLevel, goToMenu, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Button style={styles.button} title='Menu' onPress={goToMenu} />
        <Button style={styles.button} title='Quit' onPress={() => navigation.goBack()} />
        <Text>Level: {currentLevel.id}</Text>
        <Text>Number of Rows: {currentLevel.numRows}</Text>
        <Text>Number of Columns: {currentLevel.numCols}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingTop: 50,
    alignItems: 'center',
  },
  button: {
    width: '20%',
    height: 50,
  }
});
