import React, { Component } from 'react';
import { ScrollView, Text, TextInput, StyleSheet } from 'react-native';
import games from '../../games';


export default class SearchScreen extends Component {
  render() {
    const categories = [...new Set(games.map(game => game.category))];
    return (
      <ScrollView contentContainerStyle={styles.container}>
        { categories.map((category, i) => (
          <Text style={styles.categoryItem} key={i}>{category}</Text>
        ))}
      </ScrollView>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingTop: 20,
  },
  categoryItem: {
    marginTop: 10,
    fontSize: 20,
  }
});
