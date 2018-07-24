import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';
import GameControls from './GameControls';
import { Images, PlaceholderImage } from './Images';
import { ImageCard, Card } from './ImageCard';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onImageCardPress = this.onImageCardPress.bind(this);
    const cards = this._buildCards();
    this.state = {
      cellHeight: 0,
      cellWidth: 0,
      cellMargin: 10,
      cards: cards,
      selectedCards: [],
      matchedCards: [],
      preventPresses: false,
      noMatchTimer: null,
    };
  }

  _buildCards() {
    const { currentLevel: { numRows, numCols } } = this.props;
    // Build array of imageCards
    let cards = [];
    for (let i = 0; i < (numRows*numCols) / 2; i += 0.5) {
      cards.push(new Card(-1, Math.floor(i)));
    }
    cards = shuffle(cards);
    cards.map((card, i) => card.id = i);
    return cards;
  }

  onLayoutChange({ nativeEvent }) {
    const { layout: { width, height } } = nativeEvent;
    const { cellMargin } = this.state;
    console.log(`Width: ${width}, Height: ${height}`);
    const { currentLevel: { numRows, numCols } } = this.props;
    const heightMinusMargin = height - (numRows * cellMargin * 2);
    const widthMinusMargin = width - (numCols * cellMargin * 2);
    const cellWidth = widthMinusMargin / numCols;
    const cellHeight = heightMinusMargin / numRows;
    console.log(`Cell Width: ${cellWidth}, Cell Height: ${cellHeight}`);
    this.setState({
      cellHeight,
      cellWidth,
    });
  }


  //CORE GAME LOGIC
  onImageCardPress(card) {
    const { selectedCards, matchedCards, preventPresses } = this.state;
    const { currentLevel: { memTime } } = this.props;
    if (!card.faceUp && !preventPresses) {
      const newSelectedCards = [...selectedCards, card];
      card.faceUp = true;
      if (newSelectedCards.length === 2) {
        //TODO add turn event
        if (newSelectedCards[0].imageID === newSelectedCards[1].imageID) {
          // match
          const newMatchedCards = [...matchedCards, ...newSelectedCards];
          this.setState({ matchedCards: newMatchedCards, selectedCards: [] });
        } else {
          // not match
          const noMatchTimer = setTimeout(selected => {
            selected.map(c => c.faceUp = false);
            this.setState({ preventPresses: false, selectedCards: [] });
          }, memTime, newSelectedCards);
          this.setState({
            noMatchTimer: noMatchTimer,
            preventPresses: true,
          });
        }
      } else {
        this.setState({ selectedCards: newSelectedCards });
      }
    }
  }

  componentWillUnmount() {
    clearTimeout(this.state.noMatchTimer);
  }

  render() {
    const { cellHeight, cellWidth, cellMargin, cards, matchedCards } = this.state;
    const { currentLevel , navigation, goToMenu } = this.props;
    const { numRows, numCols } = currentLevel;
    const gridItemStyle = {
      height: cellHeight,
      width: cellWidth,
      margin: cellMargin,
      backgroundColor: 'black',
    };
    const imageStyle = {
      height: cellHeight,
      width: cellWidth,
      flex: 1,
    };
    return (
      <Fragment>
        <GameControls {...this.props} />
        <View style={styles.boardGridContainer} onLayout={this.onLayoutChange}>
          { cards.map(card =>
            <ImageCard
              onPress={this.onImageCardPress}
              placeholderImage={PlaceholderImage}
              imageStyle={imageStyle}
              cardContainerStyle={gridItemStyle}
              card={card}
              key={card.id}
              imageToMemorize={Images[card.imageID]}
              matched={matchedCards.includes(card)}
            />)}
        </View>
        {/* <Fragment>
          <View style={styles.completionOverlay} />
          <View style={styles.completionDialogContainer}>
            <View style={styles.completionDialog}>
              <Text>Dialog Box</Text>
            </View>
          </View>
        </Fragment> */}
      </Fragment>
    );
  }
}

// Fisher-Yates (a.k.a Knuth) shuffle
function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain cards to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining card...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--; // Originally currentIndex -= 1;

    // And swap it with the current card.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



const styles = StyleSheet.create({
  boardGridContainer: {
    marginTop: 25,
    marginBottom: 25,
    marginLeft: 15,
    marginRight: 15,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: '100%',
    alignItems: 'stretch',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
  },
  completionOverlay: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    height: '100%',
    width: '100%',
    backgroundColor: 'black',
    opacity: 0.4,
  },
  completionDialogContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completionDialog: {
    width: '60%',
    height: '60%',
    backgroundColor: 'white',
    zIndex: 1,
    opacity: 1,
  }
});
