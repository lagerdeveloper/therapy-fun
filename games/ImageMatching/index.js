import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { Asset } from 'expo';
import GameBoard from './GameBoard';
import GameMenu from './GameMenu';
import { Images, PlaceholderImage, BackgroundImage } from './Images';

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
    numCols: 3,
    memTime: 1500,
  },
  {
    id: 3,
    numRows: 3,
    numCols: 4,
    memTime: 1000,
  },
  {
    id: 4,
    numRows: 3,
    numCols: 4,
    memTime: 750,
  },
  {
    id: 5,
    numRows: 4,
    numCols: 4,
    memTime: 500,
  }
];

export default class ImageMatching extends Component {
  constructor(props) {
    super(props);
    this._playGame = this._playGame.bind(this);
    this._goToMenu = this._goToMenu.bind(this);
    this._chooseLevel = this._chooseLevel.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.completeLevel = this.completeLevel.bind(this);
    //completedLevelIDS would need to come from database (redux)
    this.state = {
      completedLevelIDS: [1],
      isGameReady: false,
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

  _loadResourcesAsync = async() => {
    try {
      await Asset.loadAsync([...Images, PlaceholderImage, BackgroundImage ]);
      console.log("cached images");
    } catch (e) {
      console.log(`Image Matching failed to load assets.
                   The game will proceed without cached assets. Please check index.js.`);
      console.log(e);
    } finally {
      this.setState({ isGameReady: true });
    }
  }

  componentDidMount() {
    this._loadResourcesAsync();
  }

  renderGame() {
    const { screen, currentLevelID, levels, completedLevelIDS } = this.state;
    if (screen === 'menu') {
      return (
        <GameMenu
          levels={levels}
          currentLevelID={currentLevelID}
          completedLevelIDS={completedLevelIDS}
          playGame={this._playGame}
          chooseLevel={this._chooseLevel}
          navigation={this.props.navigation}
        />
      );
    } else {
      return (
        <GameBoard
          currentLevel={levels.find(level => level.id === currentLevelID)}
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
      )
    }
  }
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c05649',
  },
});
