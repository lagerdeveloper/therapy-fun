import React, { Component, Fragment } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Picker,
  ImageBackground,
  ScrollView,
 } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import FlipCard from './FlipCard';
import LevelCard from './LevelCard';
import { BackgroundImage } from './Images';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './Colors';

export default class GameMenu extends Component {
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
    const { currentLevelID, chooseLevel, levels, playGame, navigation } = this.props;
    const { levelContainerMargin } = this.state;
    return (
      <Fragment>
        <ImageBackground style={styles.backgroundImage} source={BackgroundImage}>
          <View style={styles.backgroundImageOverlay} />
        </ImageBackground>
        <ScrollView onLayout={this.onMenuLayoutChange} contentContainerStyle={styles.menuContainer}>
          <Text style={styles.gameTitle}>Image Matching</Text>
          <View onLayout={this.onLayoutChange} style={[styles.levelSelectorContainer, { marginLeft: levelContainerMargin, marginRight: levelContainerMargin }]}>
            { levels.map((level, i) => {
              return (
                <LevelCard
                  key={i}
                  onPress={chooseLevel}
                  numCards={level.numRows * level.numCols}
                  levelID={level.id}
                  selected={currentLevelID === level.id}
                />
              );
            })}
          </View>
          {/* <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D0D0D0' }}>
            <Text style={styles.pickerLabel}>Select Level</Text>
          </View> */}
          {/* <Picker
            selectedValue={currentLevelID}
            style={styles.picker}
            itemStyle={styles.pickerItem}
            onValueChange={levelID => chooseLevel(levelID)}>
            { levels.map((level, i) => <Picker.Item key={i} label={`${level.id}`} value={level.id} />) }
          </Picker> */}
          <View style={styles.buttonContainer}>
            <Button raised containerViewStyle={styles.button} backgroundColor={PRIMARY_COLOR} title={`Play Level ${currentLevelID}`} onPress={playGame}/>
            <Button raised containerViewStyle={styles.button} backgroundColor={SECONDARY_COLOR} title="Exit" onPress={() => navigation.goBack()} />
          </View>
        </ScrollView>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  menuContainer: {
    flex: 1,
    justifyContent: 'space-around'
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gameTitle: {
    textAlign: 'center',
    textShadowOffset: { width: 1, height: 1 },
    textShadowColor: 'black',
    textShadowRadius: 1,
    shadowOpacity: 0.2,
    color: 'white',
    fontWeight: 'bold',
    fontSize: 50,
  },
  button: {
    marginTop: 5,
    width: '80%',
    height: 50,
  },
  picker: {
    height: 100,
    width: '80%',
    backgroundColor: '#fff',
    borderColor: 'black',
  },
  pickerLabel: {
    fontSize: 20,
  },
  pickerItem: {
    height: 100,
    borderTopWidth: 1,
    borderColor: 'black',
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
    marginLeft: 50,
    marginRight: 50,
  },
});
