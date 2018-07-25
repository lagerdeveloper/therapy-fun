import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Picker, ImageBackground, TouchableOpacity } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import FlipCard from './FlipCard';
import { BackgroundImage } from './Images';

export default class GameMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentLevelID, chooseLevel, levels, playGame, navigation } = this.props;
    return (
      <Fragment>
        <ImageBackground style={styles.backgroundImage} source={BackgroundImage}>
          <View style={styles.backgroundImageOverlay} />
        </ImageBackground>
        <View style={styles.container}>
          <Text style={styles.gameTitle}>Image Matching</Text>
          <View style={styles.menuContainer}>
            <View style={styles.levelSelectorContainer}>
              { levels.map((level, i) => {
                return (
                  <TouchableOpacity key={i} onPress={() => chooseLevel(level.id)} style={{ flexBasis: '30%', margin: 10 }}>
                    <Icon type='material-community' size={100} name={`numeric-${level.id}-box-outline`} color="#c05649" />
                  </TouchableOpacity>
                );
              })}
            </View>
            <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D0D0D0' }}>
              <Text style={styles.pickerLabel}>Select Level</Text>
            </View>
            <Picker
              selectedValue={currentLevelID}
              style={styles.picker}
              itemStyle={styles.pickerItem}
              onValueChange={levelID => chooseLevel(levelID)}>
              { levels.map((level, i) => <Picker.Item key={i} label={`${level.id}`} value={level.id} />) }
            </Picker>
            <Button raised containerViewStyle={styles.button} backgroundColor="#c05649" title={`Play Level ${currentLevelID}`} onPress={playGame}/>
            <Button raised containerViewStyle={styles.button} backgroundColor="#607a8c" title="Exit" onPress={() => navigation.goBack()} />
          </View>
        </View>
      </Fragment>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  menuContainer: {
    flex: 1,
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
    marginTop: 100,
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
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
  levelSelectorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
});
