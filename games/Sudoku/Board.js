import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import BoardControls from './BoardControls';
import { Tile, PuzzleTile, PlacementTile } from './Tile';
import { SECONDARY_COLOR, PRIMARY_COLOR } from './Colors';


export default class Board extends Component {
  constructor(props) {
    super(props);
    this.puzzleTilesLayoutChange = this.puzzleTilesLayoutChange.bind(this);
    this.placementTilesLayoutChange = this.placementTilesLayoutChange.bind(this);
    this.onPuzzleTilePress = this.onPuzzleTilePress.bind(this);
    this.onPlacementTilePress = this.onPlacementTilePress.bind(this);
    this.highlightApplicableBoardPaths = this.highlightApplicableBoardPaths.bind(this);
    this.playNextLevel = this.playNextLevel.bind(this);
    const { currentLevel } = this.props;
    const { n, rowMultiplier, colMultiplier } = Board._calcDimensions(currentLevel);
    const puzzleTiles = Board._createPuzzleTiles(currentLevel.puzzleStr, n, rowMultiplier, colMultiplier);
    const placementTiles = Board._createPlacementTiles(n)
    this.state = {
      currentLevel: currentLevel,
      n,
      rowMultiplier,
      colMultiplier,
      boardHeight: 0,
      boardWidth: 0,
      tileHeight: 0,
      tileWidth: 0,
      placementGridHeight: 0,
      placementGridWidth: 0,
      placementTileHeight: 0,
      placementTileWidth: 0,
      puzzleTiles,
      placementTiles,
      selectedPuzzleTile: null,
      lastCorrectTile: null,
      incorrectPuzzleTiles: [],
      highlightTileIDS: [],
      showCompleteDialog: false,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentLevel } = nextProps;
    if (currentLevel !== prevState.currentLevel) {
      const { placementGridHeight, placementGridWidth, boardHeight, boardWidth } = prevState;
      const { n, rowMultiplier, colMultiplier } = Board._calcDimensions(currentLevel);
      const { tileHeight, tileWidth } = Board._getTileDimensions(boardHeight, boardWidth, n);
      const { placementTileWidth, placementTileHeight } = Board._getPlacementTileDimensions(placementGridHeight, placementGridWidth, n);
      const puzzleTiles = Board._createPuzzleTiles(currentLevel.puzzleStr, n, rowMultiplier, colMultiplier);
      const placementTiles = Board._createPlacementTiles(n)
      return {
        currentLevel: currentLevel,
        n,
        rowMultiplier,
        colMultiplier,
        boardHeight,
        boardWidth,
        tileHeight,
        tileWidth,
        placementGridHeight,
        placementGridWidth,
        placementTileHeight,
        placementTileWidth,
        puzzleTiles,
        placementTiles,
        selectedPuzzleTile: null,
        lastCorrectTile: null,
        incorrectPuzzleTiles: [],
        highlightTileIDS: [],
        showCompleteDialog: false,
      };
    }
    return null;
  }

  static _createPuzzleTiles(puzzleStr, n, rowMultiplier, colMultiplier) {
    let tiles = [];
    for (let i = 0; i < puzzleStr.length / 2; i++) {
      const id = i;
      const tileStr = puzzleStr.substring(i * 2, (i * 2) + 2);
      const rowID = Math.floor(id / n);
      const colID = id % n;
      const squareRow = Math.floor(rowID / rowMultiplier);
      const squareCol = Math.floor(colID / colMultiplier);
      const square = `${squareRow}x${squareCol}`;
      const number = parseInt(tileStr.charAt(1));
      const visible = tileStr.charAt(0) === '+';
      tiles.push(new Tile(id, number, visible, rowID, colID, square));
    }
    return tiles;
  }

  static _createPlacementTiles(n) {
    let tiles = [];
    for (let i = 0; i < n; i++) {
      const id = Math.pow(n, 2) + i;
      const number = i + 1;
      tiles.push(new Tile(id, number, true));
    }
    return tiles;
  }

  static _getTileDimensions(boardHeight, boardWidth, n) {
    const tileWidth = Math.floor(boardWidth / n);
    const tileHeight = Math.floor(boardHeight / n);
    return { tileWidth, tileHeight };
  }

  static _getPlacementTileDimensions(placementGridHeight, placementGridWidth, n) {
    const placementTileWidth = Math.floor(placementGridWidth / n);
    const placementTileHeight = placementGridHeight;
    return { placementTileWidth, placementTileHeight };
  }

  static _calcDimensions(currentLevel) {
    const { puzzleStr, numRows, numCols } = currentLevel;
    const n = Math.sqrt(puzzleStr.length / 2);
    const rowMultiplier = n / numRows;
    const colMultiplier = n / numCols;
    return { n, rowMultiplier, colMultiplier };
  }

  puzzleTilesLayoutChange({ nativeEvent }) {
    const { layout: { width, height } } = nativeEvent;
    const { tileWidth, tileHeight } = Board._getTileDimensions(height, width, this.state.n);
    this.setState({
      boardHeight: height,
      boardWidth: width,
      tileHeight,
      tileWidth,
    });
  }

  placementTilesLayoutChange({ nativeEvent }) {
    const { n } = this.state;
    const { layout: { width, height } } = nativeEvent;
    const { placementTileWidth, placementTileHeight } = Board._getPlacementTileDimensions(height, width, n);
    this.setState({
      placementGridHeight: height,
      placementGridWidth: width,
      placementTileHeight,
      placementTileWidth,
    });
  }

  onPuzzleTilePress(tile) {
    this.highlightApplicableBoardPaths(tile);
    this.setState({ selectedPuzzleTile: tile, lastCorrectTile: null });
  }

  //CORE GAME LOGIC
  onPlacementTilePress(tile) {
    const { selectedPuzzleTile, puzzleTiles, incorrectPuzzleTiles, currentLevel } = this.state;
    if (selectedPuzzleTile && !selectedPuzzleTile.visible) {
      if (tile.number === selectedPuzzleTile.number) {
        //Correct
        selectedPuzzleTile.visible = true;
        const newIncorrectTiles = incorrectPuzzleTiles.filter(ipt => ipt.tile !== selectedPuzzleTile);
        this.setState({ lastCorrectTile: selectedPuzzleTile, incorrectPuzzleTiles: newIncorrectTiles });
        if (puzzleTiles.every(puzzleTile => puzzleTile.visible)) {
          this.props.completeLevel(currentLevel.id);
          this.setState({ showCompleteDialog: true });
        }
      } else {
        //Incorrect
        let incorrectTile = { number: tile.number, tile: selectedPuzzleTile };
        if (incorrectPuzzleTiles.find(ipt => ipt.tile === incorrectTile.tile)) {
          let newIncorrectTiles = incorrectPuzzleTiles.filter(ipt => ipt.tile !== incorrectTile.tile);
          this.setState({ incorrectPuzzleTiles: [...newIncorrectTiles, incorrectTile ] });
        } else {
          this.setState({ incorrectPuzzleTiles: [...incorrectPuzzleTiles, incorrectTile ] });
        }
      }
    }
  }

  highlightApplicableBoardPaths(tile) {
    const { puzzleTiles } = this.state;
    const puzzleTilesToHighlight = puzzleTiles.filter(t => {
      return t.square === tile.square || t.colID === tile.colID || t.rowID === tile.rowID;
    });
    this.setState({ highlightTileIDS: puzzleTilesToHighlight.map(pt => pt.id) });
  }

  playNextLevel() {
    const { chooseLevel, numLevels } = this.props;
    const { currentLevel } = this.state;
    const newLevelID = currentLevel.id + 1;
    if (newLevelID <= numLevels) {
      chooseLevel(newLevelID);
    }
    this.setState({ showCompleteDialog: false });
  }

  render() {
    const {
      puzzleTiles,
      placementTiles,
      tileWidth,
      tileHeight,
      placementTileWidth,
      placementTileHeight,
      rowMultiplier,
      colMultiplier,
      n,
      selectedPuzzleTile,
      lastCorrectTile,
      incorrectPuzzleTiles,
      highlightTileIDS,
      currentLevel,
      showCompleteDialog,
    } = this.state;
    const { goToMenu, numLevels } = this.props;
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
    const placementTileStyle = {
      width: placementTileWidth,
      height: placementTileHeight,
      justifyContent: 'center',
      alignItems: 'center',
    };
    return (
      <Fragment>
        <BoardControls currentLevelID={currentLevel.id} goToMenu={goToMenu} />
        <View style={styles.boardGridContainer} onLayout={this.puzzleTilesLayoutChange}>
          { puzzleTiles.map((puzzleTile, i) => (
            <PuzzleTile
              key={i}
              tile={puzzleTile}
              tileStyle={tileStyle}
              onPress={this.onPuzzleTilePress}
              n={n}
              rowMultiplier={rowMultiplier}
              colMultiplier={colMultiplier}
              selected={selectedPuzzleTile === puzzleTile}
              highlight={highlightTileIDS.includes(puzzleTile.id)}
              incorrectTile={incorrectPuzzleTiles.find(inco => inco.tile === puzzleTile)}
              correct={lastCorrectTile === puzzleTile}
            />
          ))}
        </View>
        <View style={styles.placementTilesContainer} onLayout={this.placementTilesLayoutChange}>
          { placementTiles.map((placementTile, i) => (
            <PlacementTile
              key={i}
              tile={placementTile}
              tileStyle={placementTileStyle}
              onPress={this.onPlacementTilePress}
            />
          ))}
        </View>
        { showCompleteDialog &&
          <Fragment>
            <View style={styles.completionOverlay} />
            <View style={styles.completionDialogContainer}>
              <View style={styles.completionDialog}>
                <Text style={styles.completionDialogTitle}>Level {currentLevel.id}</Text>
                <View style={styles.completeIconContainer}>
                  <Ionicons name='md-checkmark-circle' size={60} color='green' />
                  <Text style={{color: 'green'}}>Complete</Text>
                </View>
                <View style={styles.completionDialogButtonsContainer}>
                  { currentLevel.id < numLevels && <Button containerViewStyle={styles.button} backgroundColor={PRIMARY_COLOR} title={`Play Level ${currentLevel.id + 1}`} onPress={this.playNextLevel}/>}
                  <Button containerViewStyle={styles.button} backgroundColor={SECONDARY_COLOR} title="Menu" onPress={goToMenu} />
                </View>
              </View>
            </View>
          </Fragment>
        }
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
    flex: 6,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'stretch',
  },
  placementTilesContainer: {
    marginTop: 20,
    flex: 1,
    marginBottom: 20,
    marginLeft: 20,
    marginRight: 20,
    flexDirection: 'row',
    justifyContent: 'center',
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
