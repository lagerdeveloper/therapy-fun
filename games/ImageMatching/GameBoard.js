import React, { Component } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import GameControls from './GameControls';
import { Images, PlaceholderImage } from './Images';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.state = {
      cellHeight: 0,
      cellWidth: 0,
      cellMargin: 10,
    };
  }

  onLayoutChange({ nativeEvent }) {
    const { layout: { width, height } } = nativeEvent;
    const { cellMargin } = this.state;
    console.log(`Width: ${width}, Height: ${height}`);
    const { currentLevel: { numRows, numCols } } = this.props;
    const heightMinusMargin = height - (numRows * cellMargin * 2);
    const widthMinusMargin = width - (numCols * cellMargin * 2);
    const cellWidth = widthMinusMargin / numCols;
    const cellHeight = heightMinusMargin / numRows;
    console.log(`Cell Width: ${cellWidth}, Cell Height: ${cellHeight}`);
    this.setState({
      cellHeight: cellHeight,
      cellWidth: cellWidth,
    });
  }

  render() {
    const { cellHeight, cellWidth, cellMargin } = this.state;
    const gridItemStyle = {
      height: cellHeight,
      width: cellWidth,
      margin: cellMargin,
      backgroundColor: 'black',
    };
    const imageStyle = {
      height: cellHeight,
      width: cellWidth,
      flex: 1,
    };
    const { currentLevel , navigation, goToMenu } = this.props;
    const { numRows, numCols } = currentLevel;
    const cards = []
    for (let i = 0; i < (numRows*numCols) / 2; i += 0.5) {
      cards.push(
        <View style={gridItemStyle} key={i}>
          <Image style={imageStyle} source={PlaceholderImage} />
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <GameControls {...this.props} />
        <View style={styles.boardGridContainer} onLayout={this.onLayoutChange}>
          {cards}
        </View>
      </View>
    );
  }
}



const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    flex: 1,
    alignItems: 'center',
  },
  button: {
    width: '80%',
    height: 50,
  },
  boardGridContainer: {
    marginTop: 50,
    marginBottom: 50,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    height: '100%',
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  }
});
