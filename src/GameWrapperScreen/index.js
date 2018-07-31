import React, { Component } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import games from '../../games';

class GameWrapper extends Component {
  render() {
    const { navigation } = this.props;
    const { getParam } = navigation;
    const gameId = getParam('id', 1);
    const GameComponent = games[gameId].game;
    return <GameComponent navigation={navigation} />;
  }
}

export default GameWrapper;
