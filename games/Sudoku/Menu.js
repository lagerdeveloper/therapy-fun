import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  ScrollView,
  TouchableOpacity,
 } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Button, Icon } from 'react-native-elements';
import LevelCard from './LevelCard';
import { BackgroundImage } from './Images';

export default class Menu extends Component {
  constructor(props) {
    super(props);
    this.onMenuLayoutChange = this.onMenuLayoutChange.bind(this);
    this.state = {
      levelContainerMargin: 0,
    };
  }

  onMenuLayoutChange({ nativeEvent }) {
    const { layout: { width, height } } = nativeEvent;
    console.log(`Width: ${width}, Height: ${height}`);
    const levelContainerMargin = (width - 300 - 80) / 2;
    this.setState({ levelContainerMargin });
  }

  render() {
    const { currentLevelID, chooseLevel, levels, navigation, completedLevelIDS } = this.props;
    const { levelContainerMargin } = this.state;
    return (
      <Fragment>
        <ImageBackground style={styles.backgroundImage} source={BackgroundImage}>
          <View style={styles.backgroundImageOverlay} />
        </ImageBackground>
        <TouchableOpacity style={styles.closeButton} onPress={() => navigation.goBack()}>
          <View style={styles.closeIconContainer} />
          <MaterialCommunityIcons style={styles.closeIcon} name='close' size={40} color='white' />
        </TouchableOpacity>
        <ScrollView onLayout={this.onMenuLayoutChange}>
          <Text style={styles.gameTitle}>Sudoku</Text>
          <View onLayout={this.onLayoutChange} style={[styles.levelSelectorContainer, { marginLeft: levelContainerMargin, marginRight: levelContainerMargin }]}>
            { levels.map((level, i) => {
              return (
                <LevelCard
                  key={i}
                  onPress={chooseLevel}
                  complete={completedLevelIDS.includes(level.id)}
                  subtitle={`${level.numRows}x${level.numCols}`}
                  levelID={level.id}
                  selected={currentLevelID === level.id}
                />
              );
            })}
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  gameTitle: {
    textAlign: 'center',
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: 'black',
    textShadowRadius: 1,
    shadowOpacity: 0.2,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
    marginTop: 60,
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
    flex: 1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  levelSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: 100,
    marginBottom: 'auto',
    marginLeft: 50,
    marginRight: 50,
  },
  closeIconContainer: {
    position: 'absolute',
    top: 25,
    right: 20,
    margin: 'auto',
    backgroundColor: 'black',
    height: 40,
    width: 40,
    borderRadius: 20,
    opacity: 0.4,
  },
  closeIcon: {
    position: 'absolute',
    top: 25,
    right: 20,
    margin: 'auto',
  },
  closeButton: {
    zIndex: 5,
  }
});
