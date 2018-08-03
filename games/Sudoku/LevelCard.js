import React, { Fragment } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './Colors';

export default (props) => {
  const { selected, subtitle, levelID, onPress, complete } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={() => onPress(levelID)}
      style={[styles.container, selected && styles.selected]}
    >
      <Text style={styles.levelTitle}>{levelID}</Text>
      <Text style={styles.levelDescription}>{subtitle}</Text>
      { complete &&
        <Fragment>
          <View style={styles.levelComplete} />
          <MaterialCommunityIcons style={styles.levelCompleteIcon} name='check' color='#39a039' size={40} />
        </Fragment>
      }
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
  },
  levelComplete: {
    position: 'absolute',
    height: 40,
    width: 40,
    borderRadius: 20,
    top: -12,
    left: -12,
    backgroundColor: 'white',
    opacity: 0.6,
  },
  levelCompleteIcon: {
    position: 'absolute',
    top: -12,
    left: -12,
  }
});
