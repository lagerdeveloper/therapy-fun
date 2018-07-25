import React, { Component } from 'react';
import { View, Text, StyleSheet, Picker } from 'react-native';
import { Button } from 'react-native-elements';
import FlipCard from './FlipCard';

export default class GameMenu extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { currentLevelID, chooseLevel, levels, playGame, navigation } = this.props;
    return (
      <View style={styles.container}>
        <Text style={styles.gameTitle}>Image Matching</Text>
        <View style={styles.menuContainer}>
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around'
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
    fontSize: 60,
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
  }
});
