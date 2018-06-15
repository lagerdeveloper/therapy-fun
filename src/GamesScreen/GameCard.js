import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default GameCard = (props) => {
  const { game } = props;
  return (
    <TouchableOpacity style={styles.card} onPress={props.onPress}>
      <Image style={styles.image} resizeMode='stretch' source={game.image_source} />
      <Text style={styles.name}>{game.name}</Text>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    alignItems: 'center',
    width: 350,
    borderWidth: 1,
    borderColor: '#edeeef',
    backgroundColor: 'white',
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    color: '#000',
    padding: 10,
  },
  image: {
    width: 348,
    height: 200,
  }
});
