import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import games from '../../games';
import GameCard from './GameCard';

class GamesScreen extends Component {
  static navigationOptions = {
    title: 'Therapy Fun'
  };

  render() {
    const { navigate } = this.props.navigation;
    const { gameIDS } = this.props;
    return (
      <ScrollView>
        <View style={styles.container}>
          { gameIDS.map((gameID, i) =>
            <GameCard
              key={i}
              onPress={() => navigate('Game', { id: games[gameID].id })}
              game={games[gameID]}
            />
          )}
        </View>
      </ScrollView>
    );
  }
}

export default connect(state => ({ gameIDS: state.games }), null)(GamesScreen);

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
