import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import games from '../../games';
import GameCard from './GameCard';

export default class GamesScreen extends Component {
  static navigationOptions = {
    title: 'Therapy Fun'
  };

  render() {
    const { navigate } = this.props.navigation;
    return (
      <ScrollView>
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
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
    flex: 1,
    marginTop: 10,
  },
});
