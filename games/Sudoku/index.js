import React, { Component, Fragment } from 'react';
import { Header } from 'react-native-elements';
import { View, Text, StyleSheet, Button } from 'react-native';

export default class Sudoku extends Component {
  render() {
    return (
      <Fragment>
        <Header
          outerContainerStyles={{ backgroundColor: '#fff' }}
          rightComponent={{ icon: 'home', color: '#000' }}
        />
        <View style={styles.container}>
          <Button title='Go Back' onPress={() => this.props.navigation.goBack()} />
          <Text>Sudoku Game Code</Text>
        </View>
      </Fragment>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
