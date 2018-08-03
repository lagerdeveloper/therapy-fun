import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TRANSPARENT_LIGHT_BLUE, LIGHT_BLUE, SECONDARY_COLOR_TRANSPARENT } from './Colors';

class Tile {
  constructor(id, number, visible, rowID = null, colID = null, square = null) {
    this.id = id;
    this.number = number;
    this.visible = visible;
    this.rowID = rowID;
    this.colID = colID;
    this.square = square;
  }
}

class PlacementTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tile, tileStyle, onPress } = this.props;
    return (
      <TouchableOpacity activeOpacity={1} style={tileStyle} onPress={() => onPress(tile)}>
        { tile.visible && <Text style={{ fontSize: 40 }}>{tile.number}</Text> }
      </TouchableOpacity>
    );
  }
}


class PuzzleTile extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { tileStyle, tile, rowMultiplier, colMultiplier, n } = this.props;
    let borderStyle = {};
    if (tile.rowID === 0) {
      borderStyle = { borderTopWidth: 3, borderTopColor: 'black' };
    }
    if (tile.colID === 0) {
      borderStyle = {...{ borderLeftWidth: 3, borderLeftColor: 'black' }, ...borderStyle };
    }
    if (tile.colID === n-1) {
      borderStyle = {...{ borderRightWidth: 3, borderRightColor: 'black' }, ...borderStyle };
    }
    if (tile.rowID === n-1) {
      borderStyle = {...{ borderBottomWidth: 3, borderBottomColor: 'black' }, ...borderStyle };
    }
    if (((tile.colID + 1) % colMultiplier) === 0) {
      borderStyle = {...{ borderRightWidth: 3, borderRightColor: 'black'}, ...borderStyle };
    }
    if (((tile.rowID + 1) % rowMultiplier) === 0) {
      borderStyle = {...{ borderBottomWidth: 3, borderBottomColor: 'black' }, ...borderStyle };
    }
    if (tile.rowID % rowMultiplier === 0) {
      borderStyle = {...{ borderTopWidth: 0, borderTopColor: 'transparent' }, ...borderStyle };
    }
    if (tile.colID % colMultiplier === 0) {
      borderStyle = {...{ borderLeftWidth: 0, borderLeftColor: 'transparent' }, ...borderStyle };
    }
    const styleWithBorder = {...tileStyle, ...borderStyle };
    let backgroundStyle = {};
    const { selected, highlight, incorrectTile } = this.props;
    if (selected) {
      backgroundStyle = styles.selectedStyle;
    } else if (highlight) {
      backgroundStyle = styles.highlightStyle;
    }
    return (
      <TouchableOpacity activeOpacity={1} style={styleWithBorder} onPress={() => this.props.onPress(tile)}>
        <View style={[styles.tileBackground, backgroundStyle]}/>
        { tile.visible && <Text style={[styles.tileNumberStyle, this.props.correct && styles.tileNumberCorrectStyle]}>{tile.number}</Text> ||
          incorrectTile && <Text style={styles.tileNumberIncorrectStyle}>{incorrectTile.number}</Text> }
      </TouchableOpacity>
    );
  }
}

export { PuzzleTile, Tile, PlacementTile };

const styles = StyleSheet.create({
  selectedStyle: {
    backgroundColor: TRANSPARENT_LIGHT_BLUE,
  },
  highlightStyle: {
    backgroundColor: SECONDARY_COLOR_TRANSPARENT,
  },
  tileBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
  },
  tileNumberStyle: {
    fontSize: 30,
  },
  tileNumberIncorrectStyle: {
    fontSize: 30,
    color: 'red',
  },
  tileNumberCorrectStyle: {
    color: 'green',
  },
});
