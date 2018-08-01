import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import BoardControls from './BoardControls';
import { Tile, TileComponent } from './Tile';


export default class Board extends Component {
  constructor(props) {
    super(props);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    const { currentLevel } = this.props;
    const { n, rowMultiplier, colMultiplier } = Board._calcMultipliers(currentLevel);
    const tiles = Board._createPuzzleTiles(currentLevel.puzzleStr, n);
    this.state = {
      currentLevel: currentLevel,
      n,
      rowMultiplier,
      colMultiplier,
      gridHeight: 0,
      gridWidth: 0,
      tileHeight: 0,
      tileWidth: 0,
      tiles,
    };
  }

  static _createPuzzleTiles(puzzleStr, n) {
    let tiles = [];
    for (let i = 0; i < puzzleStr.length / 2; i++) {
      const id = i;
      const title = puzzleStr.substring(i * 2, (i * 2) + 2);
      const rowID = Math.floor(id / n);
      const colID = id % n;
      const number = parseInt(title.charAt(1));
      const visible = title.charAt(0) === '+';
      tiles.push(new Tile(id, title, number, visible, rowID, colID));
    }
    return tiles;
  }

  static _getTileDimensions(boardHeight, boardWidth, n) {
    const tileWidth = Math.floor(boardWidth / n);
    const tileHeight = Math.floor(boardHeight / n);
    return { tileWidth, tileHeight };
  }

  static _calcMultipliers(currentLevel) {
    const { puzzleStr, numRows, numCols } = currentLevel;
    const n = Math.sqrt(puzzleStr.length / 2);
    const rowMultiplier = n / numRows;
    const colMultiplier = n / numCols;
    return { n, rowMultiplier, colMultiplier };
  }

  onLayoutChange({ nativeEvent }) {
    const { layout: { width, height } } = nativeEvent;
    const { tileWidth, tileHeight } = Board._getTileDimensions(height, width, this.state.n);
    console.log(`Tile Width: ${tileWidth}, Tile Height: ${tileHeight}`);
    this.setState({
      gridHeight: height,
      gridWidth: width,
      tileHeight,
      tileWidth,
    });
  }

  render() {
    const { tiles, tileWidth, tileHeight, rowMultiplier, colMultiplier, n } = this.state;
    const { goToMenu, currentLevel } = this.props;
    const tileStyle = {
      width: tileWidth,
      height: tileHeight,
      borderTopWidth: 1,
      borderBottomWidth: 1,
      borderLeftWidth: 1,
      borderRightWidth: 1,
      borderTopColor: 'grey',
      borderBottomColor: 'grey',
      borderLeftColor: 'grey',
      borderRightColor: 'grey',
      justifyContent: 'center',
      alignItems: 'center',
    };
    return (
      <Fragment>
        <BoardControls currentLevelID={currentLevel.id} goToMenu={goToMenu} />
        <View style={styles.boardGridContainer} onLayout={this.onLayoutChange}>
          { tiles.map((tile, i) => (
            <TileComponent
              key={i}
              tile={tile}
              tileStyle={tileStyle}
              n={n}
              rowMultiplier={rowMultiplier}
              colMultiplier={colMultiplier}
            />
          ))}
          {/* { cards.map(card =>
            <ImageCard
              onPress={this.onImageCardPress}
              placeholderImage={PlaceholderImage}
              imageStyle={imageStyle}
              cardContainerStyle={gridItemStyle}
              card={card}
              key={card.id}
              imageToMemorize={Images[card.imageID]}
              matched={matchedCards.includes(card)}
            />)} */}
        </View>
        <View style={styles.gameControlsContainer}>
        </View>
      </Fragment>
    );
  }
}


const styles = StyleSheet.create({
  boardGridContainer: {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '85%',
    alignItems: 'stretch',
  },
  gameControlsContainer: {
    padding: 10,
    width: '100%',
    height: '15%',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  completionOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.4,
  },
  completionDialogContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionDialog: {
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    height: 300,
    backgroundColor: 'white',
    opacity: 1,
    shadowOffset: { width: -3, height: 3 },
    shadowRadius: 3,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  completionDialogButtonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  completionDialogTitle: {
    fontSize: 28,
  },
  completeIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 5,
    width: '80%',
    height: 50,
  },
});
