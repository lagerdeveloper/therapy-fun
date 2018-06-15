import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import games from '../../games';

class Game extends Component {
  render() {
    const { navigation } = this.props;
    const { navigate, getParam } = navigation;
    const gameId = getParam('id', 1);
    const GameComponent = games.find(game => game.id === gameId).game;
    return (
      <View style={styles.container}>
        <Button
          onPress={() => navigate('Main')}
          title="Go Back"
        />
        <GameComponent />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default Game;
