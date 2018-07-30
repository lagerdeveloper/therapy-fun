import React from 'react';
import { Card } from 'react-native-elements';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default GameCard = (props) => {
  const { game } = props;
  return (
    <TouchableOpacity onPress={props.onPress} >
      <Card containerStyle={styles.card} imageProps={{ resizeMode: 'cover' }} image={game.image_source}>
        <View style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Text style={styles.name}>{game.name}</Text>
        </View>
      </Card>
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
  card: {
    width: 325,
    backgroundColor: 'white',
    marginBottom: 10,
    height: 200,
  },
  name: {
    fontSize: 20,
    color: '#000',
  },
  image: {
    width: 325,
    height: 200,
  }
});
