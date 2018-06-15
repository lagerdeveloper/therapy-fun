import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import games from '../../games';
import GameCard from './GameCard';

export default class GamesScreen extends Component {
  static navigationOptions = {
    title: 'Therapy Fun'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        {/* <Button
          onPress={() => navigate('Game')}
          title="Game Screen"
        /> */}
        { games.map((game, i) =>
          <GameCard
            key={i}
            onPress={() => navigate('Game', { id: game.id })}
            game={game}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    alignItems: 'center',
  },
});
