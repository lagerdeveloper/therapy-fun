import React, { Component, Fragment } from 'react';
import { View, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { Asset } from 'expo';
import GameBoard from './GameBoard';
import GameMenu from './GameMenu';
import { Images, PlaceholderImage } from './Images';

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
    this.state = {
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

  _loadResourcesAsync = async() => {
    try {
      await Asset.loadAsync([...Images, PlaceholderImage, require('./background.jpg') ]);
      console.log("cached images");
    } catch (e) {
      console.log(`Image Matching failed to load assets.
                   The game will proceed without cached assets. Please check index.js.`);
      consol.log(e);
    } finally {
      this.setState({ isGameReady: true });
    }
  }

  componentDidMount() {
    this._loadResourcesAsync();
  }

  renderGame() {
    const { screen, currentLevelID, levels } = this.state;
    if (screen === 'menu') {
      return (
        <Fragment>
          <ImageBackground style={styles.backgroundImage} source={require('./background.jpg')}>
            <View style={styles.backgroundImageOverlay} />
          </ImageBackground>
          <GameMenu
            levels={levels}
            currentLevelID={currentLevelID}
            playGame={this._playGame}
            chooseLevel={this._chooseLevel}
            navigation={this.props.navigation}
          />
        </Fragment>
      );
    } else {
      return (
        <GameBoard
          currentLevel={levels.find(level => level.id === currentLevelID)}
          numLevels={levels.length}
          goToMenu={this._goToMenu}
          chooseLevel={this._chooseLevel}
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
    backgroundColor: 'rgb(43,151,219)',
  },
  backgroundImageOverlay: {
    position: 'absolute',
    flex: 1,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.2,
  },
  backgroundImage: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
});
