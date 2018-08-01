import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { Header } from 'react-native-elements';
import { View, Text, StyleSheet, Button, ActivityIndicator } from 'react-native';
import Menu from './Menu';
import Board from './Board';

class Sudoku extends Component {
  constructor(props) {
    super(props);
    this._playGame = this._playGame.bind(this);
    this._goToMenu = this._goToMenu.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this._chooseLevel = this._chooseLevel.bind(this);
    this.completeLevel = this.completeLevel.bind(this);
    this.state = {
      completedLevelIDS: [],
      isGameReady: true,
      screen: 'menu',
      currentLevelID: 1,
      levels: [],
      playGameTimer: null,
    };
  }

  _playGame() {
    this.setState({ screen: 'board' });
  }

  _goToMenu() {
    this.setState({ screen: 'menu' });
  }

  _chooseLevel(levelID) {
    this.setState({ currentLevelID: levelID });
    const playGameTimer = setTimeout(() => this._playGame(), 250);
    this.setState({ playGameTimer });
  }

  completeLevel(levelID) {
    this.setState(prevState => {
      const { completedLevelIDS, ...rest } = prevState;
      console.log(`Completed Levels: ${completedLevelIDS}`);
      return {
        ...rest,
        completedLevelIDS: [...completedLevelIDS, levelID],
      };
    });
  }

  componentDidMount() {
    const { id, gameLevels } = this.props;
    if (gameLevels.hasOwnProperty(id)) {
      this.setState({ levels: gameLevels[id], isGameReady: true });
    } else {
      // Logic for ajax request will go here
      setTimeout(() => this.setState({ levels: gameLevels[id], isGameReady: true }), 1000);
    }
  }

  renderGame() {
    const { screen, currentLevelID, levels, completedLevelIDS } = this.state;
    if (screen === 'menu') {
      return (
        <Menu
          levels={levels}
          currentLevelID={currentLevelID}
          completedLevelIDS={completedLevelIDS}
          chooseLevel={this._chooseLevel}
          navigation={this.props.navigation}
        />
      );
    } else {
      return (
        <Board
          currentLevel={levels.find(level => level.id === currentLevelID) }
          numLevels={levels.length}
          goToMenu={this._goToMenu}
          chooseLevel={this._chooseLevel}
          completeLevel={this.completeLevel}
          navigation={this.props.navigation}
        />
      );
    }
  }

  render() {
    const { isGameReady } = this.state;
    if (isGameReady) {
      return this.renderGame();
    } else {
      return (
        <View style={styles.container}>
          <ActivityIndicator size="large" color='white'/>
        </View>
      );
    }
  }
};

export default connect(state => ({ gameLevels: state.gameLevels }), null)(Sudoku);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c05649',
  },
});
