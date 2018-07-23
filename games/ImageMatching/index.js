import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Picker, Button } from 'react-native';
import GameBoard from './GameBoard';
import GameMenu from './GameMenu';

//NOTE these levels will be extracted from ajax request or redux store
//NOTE use DifficultyLevel class to represent the value objects
const levels = [
  {
    id: 1,
    numRows: 2,
    numCols: 3,
    memTime: 2000,
  },
  {
    id: 2,
    numRows: 2,
    numCols: 4,
    memTime: 1000,
  },
  {
    id: 3,
    numRows: 2,
    numCols: 3,
    memTime: 1500,
  },
  {
    id: 4,
    numRows: 2,
    numCols: 3,
    memTime: 1500,
  },
  {
    id: 5,
    numRows: 2,
    numCols: 3,
    memTime: 1500,
  }
];

export default class ImageMatching extends Component {
  constructor(props) {
    super(props);
    this._playGame = this._playGame.bind(this);
    this._goToMenu = this._goToMenu.bind(this);
    this._chooseLevel = this._chooseLevel.bind(this);
    this.state = {
      screen: 'menu',
      currentLevelID: 1,
      levels: levels,
    }
  }

  _playGame() {
    this.setState({ screen: 'gameBoard' });
  }

  _goToMenu() {
    this.setState({ screen: 'menu' });
  }

  _chooseLevel(levelID) {
    this.setState({ currentLevelID: levelID });
  }

  render() {
    const { screen, currentLevelID, levels } = this.state;
    if (screen === 'menu') {
      return (
        <GameMenu
          levels={levels}
          currentLevelID={currentLevelID}
          playGame={this._playGame}
          chooseLevel={this._chooseLevel}
          navigation={this.props.navigation}
        />
      );
    } else {
      return (
        <GameBoard
          currentLevel={levels.find(level => level.id === currentLevelID)}
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
