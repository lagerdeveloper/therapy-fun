import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, PickerIOS, Button } from 'react-native';

//NOTE these levels will be extracted from ajax request or redux store
const levels = [
  {
    label: '1',
    value: 1,
  },
  {
    label: '2',
    value: 2,
  },
  {
    label: '3',
    value: 3,
  },
  {
    label: '4',
    value: 4,
  },
]

export default class ImageMatching extends Component {
  constructor(props) {
    super(props);
    this.renderMenu = this.renderMenu.bind(this);
    this._playGame = this._playGame.bind(this);
    this._goToMenu = this._goToMenu.bind(this);
    this.state = {
      screen: 0,
      difficultyLevel: 1,
    }
  }

  _playGame() {
    this.setState({ screen: 1 });
  }

  _goToMenu() {
    this.setState({ screen: 0 });
  }

  renderMenu() {
    return (
      <View style={styles.container}>
        <View style={{ width: '80%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#D0D0D0' }}>
          <Text style={styles.pickerLabel}>Select Difficulty Level</Text>
        </View>
        <PickerIOS
          selectedValue={this.state.difficultyLevel}
          style={styles.picker}
          itemStyle={styles.pickerItem}
          onValueChange={level => this.setState({difficultyLevel: level})}>
          { levels.map((level, i) => <PickerIOS.Item key={i} label={level.label} value={level.label} />) }
        </PickerIOS>
        <Button style={styles.button} title="Play Game" onPress={this._playGame}/>
      </View>
    );
  }


  render() {
    if (this.state.screen === 0) {
      return this.renderMenu()
    } else {
      return (
        <View style={styles.container}>
          <Button style={styles.button} title='Menu' onPress={this._goToMenu} />
          <Button style={styles.button} title='Quit' onPress={() => this.props.navigation.goBack()} />
          <Text>Image Matching Game Code</Text>
          <Text>Game Board Goes Here</Text>
        </View>
      );
    }
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
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
