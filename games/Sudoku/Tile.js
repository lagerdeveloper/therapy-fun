import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Tile {
  constructor(id, title, number, visible, rowID, colID) {
    this.id = id;
    this.title = title;
    this.number = number;
    this.visible = visible;
    this.rowID = rowID;
    this.colID = colID;
  }
}


class TileComponent extends Component {
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
      borderStyle = {...{ borderTopWidth: 0}, ...borderStyle };
    }
    if (tile.colID % colMultiplier === 0) {
      borderStyle = {...{ borderLeftWidth: 0}, ...borderStyle };
    }
    const styleWithBorder = {...tileStyle, ...borderStyle };
    return (
      <TouchableOpacity style={styleWithBorder}>
        { tile.visible && <Text style={{ fontSize: 20 }}>{tile.number}</Text> }
      </TouchableOpacity>
    );
  }
}

export { TileComponent, Tile };

const styles = StyleSheet.create({
  matchOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.2,
    height: '100%',
    width: '100%',
  },
  matchCheckmark: {
    flex: 1,
    position: 'absolute',
    top: 5,
    left: 5,
  }
});
