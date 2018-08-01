import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, ActivityIndicator, ImageBackground } from 'react-native';
import { Asset } from 'expo';
import GameBoard from './GameBoard';
import GameMenu from './GameMenu';
import { Images, PlaceholderImage, BackgroundImage } from './Images';

//NOTE these levels will be extracted from ajax request or redux store
//NOTE use DifficultyLevel class to represent the value objects

class ImageMatching extends Component {
  constructor(props) {
    super(props);
    this._playGame = this._playGame.bind(this);
    this._goToMenu = this._goToMenu.bind(this);
    this._chooseLevel = this._chooseLevel.bind(this);
    this.renderGame = this.renderGame.bind(this);
    this.completeLevel = this.completeLevel.bind(this);
    this._loadLevelData = this._loadLevelData.bind(this);
    //completedLevelIDS would need to come from database (redux will manage this data)
    this.state = {
      completedLevelIDS: [1],
      isGameReady: false,
      screen: 'menu',
      currentLevelID: 1,
      levels: [],
      playGameTimer: null,
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

  _loadResourcesAsync = async() => {
    try {
      await Asset.loadAsync([...Images, PlaceholderImage, BackgroundImage ]);
      console.log("cached images");
    } catch (e) {
      console.log(`Image Matching failed to load assets.
                   The game will proceed without cached assets. Please check index.js.`);
      console.log(e);
    }
  }

  //TODO this will need to make an ajax request to get level information
  //TODO first check if this.props.gameLevels[this.props.id] exists already
  //TODO implement error handling if ajax request fails
  _loadLevelData = async() => {
    if (this.props.gameLevels.hasOwnProperty(this.props.id)) {
      this.setState({ levels: this.props.gameLevels[this.props.id], isGameReady: true });
    } else {
      // Logic for ajax request will go here
      setTimeout(() => this.setState({ levels: this.props.gameLevels[this.props.id], isGameReady: true }), 1000);
    }
  }

  componentDidMount() {
    this._loadResourcesAsync();
    this._loadLevelData();
  }

  componentWillUnmount() {
    clearTimeout(this.state.playGameTimer);
  }

  renderGame() {
    const { screen, currentLevelID, levels, completedLevelIDS } = this.state;
    if (screen === 'menu') {
      return (
        <GameMenu
          levels={levels}
          currentLevelID={currentLevelID}
          completedLevelIDS={completedLevelIDS}
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

export default connect(state => ({ gameLevels: state.gameLevels }), null)(ImageMatching);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#c05649',
  },
});
