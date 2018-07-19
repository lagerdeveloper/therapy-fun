import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Picker, Button } from 'react-native';
import GameBoard from './GameBoard';
import GameMenu from './GameMenu';

//NOTE these levels will be extracted from ajax request or redux store
const levels = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
]

export default class ImageMatching extends Component {
  constructor(props) {
    super(props);
    this._playGame = this._playGame.bind(this);
    this._goToMenu = this._goToMenu.bind(this);
    this._chooseDifficultyLevel = this._chooseDifficultyLevel.bind(this);
    this.state = {
      screen: 0,
      difficultyLevel: 1,
    }
  }

  _playGame() {
    this.setState({ screen: 1 });
  }

  _goToMenu() {
    this.setState({ screen: 0 });
  }

  _chooseDifficultyLevel(level) {
    this.setState({ difficultyLevel: level });
  }

  render() {
    if (this.state.screen === 0) {
      return (
        <GameMenu
          difficultyLevels={levels}
          difficultyLevel={this.state.difficultyLevel}
          playGame={this._playGame}
          chooseDifficultyLevel={this._chooseDifficultyLevel}
        />
      );
    } else {
      return (
        <GameBoard
          difficultyLevel={this.state.difficultyLevel}
          goToMenu={this._goToMenu}
          navigation={this.props.navigation}
        />
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameTitle: {
    fontSize: 50,
    marginBottom: '50%',
  },
  button: {
    width: '80%',
    height: 50,
  },
  picker: {
    height: 100,
    width: '80%',
    backgroundColor: '#fff',
    borderColor: 'black',
  },
  pickerLabel: {
    fontSize: 20,
  },
  pickerItem: {
    height: 100,
    borderTopWidth: 1,
    borderColor: 'black',
  }
});
