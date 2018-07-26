import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export default (props) => {
  const { selected, numCards, levelID, onPress } = props;
  return (
    <TouchableOpacity onPress={() => onPress(levelID)} style={styles.container}>
      <Text>Level {levelID}</Text>
      { selected && <Text>Selected</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    flexBasis: '30%',
    margin: 10,
    backgroundColor: 'white',
  },
});
