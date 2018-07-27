import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './Colors';

export default (props) => {
  const { selected, numCards, levelID, onPress } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(levelID)}
      style={[styles.container, selected && styles.selected]}
    >
      <Text style={styles.levelTitle}>{levelID}</Text>
      <Text style={styles.levelDescription}>{numCards} Images</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    width: 150,
    padding: 5,
    flexShrink: 0,
    justifyContent: 'space-around',
    marginLeft: 20,
    marginRight: 20,
    marginTop: 10,
    marginBottom: 10,
    backgroundColor: SECONDARY_COLOR,
    alignItems: 'center',
    borderRadius: 5,
  },
  levelTitle: {
    fontSize: 40,
    fontWeight: '600',
    color: 'white',
  },
  levelDescription: {
    color: 'white',
  },
  selected: {
    backgroundColor: PRIMARY_COLOR,
  }
});
