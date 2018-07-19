import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View style={styles.container}>
        <Button style={styles.button} title='Menu' onPress={this.props.goToMenu} />
        <Button style={styles.button} title='Quit' onPress={() => this.props.navigation.goBack()} />
        <Text>Difficulty Level: {this.props.difficultyLevel}</Text>
        <Text>Image Matching Game Code</Text>
        <Text>Game Board Goes Here</Text>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 50,
  },
});
