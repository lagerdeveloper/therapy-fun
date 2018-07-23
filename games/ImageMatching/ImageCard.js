import React, { Component, Fragment } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

class Card {
  constructor(id, imageID) {
    this.id = id;
    this.imageID = imageID;
    this.faceUp = false;
  }
}


class ImageCard extends Component {
  constructor(props) {
    super(props);
    this.renderCheckmark = this.renderCheckmark.bind(this);
    this.state = {
      id: props.card.id,
      imageID: props.card.imageID,
      imageToMemorize: props.imageToMemorize,
      faceUp: props.card.faceUp,
      matched: props.matched,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    return {
      id: nextProps.card.id,
      imageID: nextProps.card.imageID,
      imageToMemorize: nextProps.imageToMemorize,
      faceUp: nextProps.card.faceUp,
      matched: nextProps.matched,
    };
  }

  renderCheckmark() {
    const { matched } = this.state;
    if (matched) {
      return (
        <Fragment>
          <View style={styles.matchOverlay} />
          <Ionicons style={styles.matchCheckmark} name='md-checkmark-circle-outline' color='#90ee90' size={40} />
        </Fragment>
      );
    }
    return;
  }

  render() {
    const { placeholderImage, imageStyle, cardContainerStyle, card } = this.props;
    const { faceUp, matched, imageToMemorize } = this.state;
    return (
      <TouchableOpacity activeOpacity={1} onPress={() => this.props.onPress(card)}>
        <View style={cardContainerStyle}>
          { faceUp ?
            <Image style={imageStyle} source={imageToMemorize} /> :
            <Image style={imageStyle} source={placeholderImage} />
          }
          { this.renderCheckmark() }
        </View>
      </TouchableOpacity>
    );
  }
}

export { ImageCard, Card };

const styles = StyleSheet.create({
  matchOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: 'black',
    opacity: 0.2,
    height: '100%',
    width: '100%',
  },
  matchCheckmark: {
    flex: 1,
    position: 'absolute',
    top: 5,
    left: 5,
  }
});
