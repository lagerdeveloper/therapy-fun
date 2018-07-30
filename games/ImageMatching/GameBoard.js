import React, { Component, Fragment } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Button } from 'react-native-elements';
import BoardControls from './BoardControls';
import { Images, PlaceholderImage } from './Images';
import { ImageCard, Card } from './ImageCard';
import { PRIMARY_COLOR, SECONDARY_COLOR } from './Colors';

export default class GameBoard extends Component {
  constructor(props) {
    super(props);
    this.onLayoutChange = this.onLayoutChange.bind(this);
    this.onImageCardPress = this.onImageCardPress.bind(this);
    this.playNextLevel = this.playNextLevel.bind(this);
    const cards = GameBoard._buildCards(this.props.currentLevel);
    this.state = {
      currentLevel: this.props.currentLevel,
      gridHeight: 0,
      gridWidth: 0,
      cellHeight: 0,
      cellWidth: 0,
      cellMargin: 10,
      cards: cards,
      selectedCards: [],
      matchedCards: [],
      preventPresses: false,
      noMatchTimer: null,
      showCompleteDialog: false,
      showCompleteTimer: null,
    };
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { currentLevel } = nextProps;
    if (currentLevel !== prevState.currentLevel) {
      const { gridHeight, gridWidth, cellMargin } = prevState;
      const cards = GameBoard._buildCards(currentLevel);
      const { cellWidth, cellHeight } = GameBoard._getCardDimensions(gridHeight, gridWidth, cellMargin, currentLevel);
      return {
        currentLevel: currentLevel,
        gridHeight: gridHeight,
        gridWidth: gridWidth,
        cellHeight: cellHeight,
        cellWidth: cellWidth,
        cellMargin: cellMargin,
        cards: cards,
        selectedCards: [],
        matchedCards: [],
        preventPresses: false,
        noMatchTimer: null,
        showCompleteDialog: false,
        showCompleteTimer: null,
      };
    }
    return null;
  }

  static _getCardDimensions(boardHeight, boardWidth, cellMargin, currentLevel) {
    const { numRows, numCols } = currentLevel;
    const heightMinusMargin = boardHeight - (numRows * cellMargin * 2);
    const widthMinusMargin = boardWidth - (numCols * cellMargin * 2);
    const cellWidth = widthMinusMargin / numCols;
    const cellHeight = heightMinusMargin / numRows;
    return { cellWidth, cellHeight };
  }

  static _buildCards(currentLevel) {
    const { numRows, numCols } = currentLevel;
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
    const { cellWidth, cellHeight } = GameBoard._getCardDimensions(height, width, cellMargin, this.state.currentLevel);
    console.log(`Cell Width: ${cellWidth}, Cell Height: ${cellHeight}`);
    this.setState({
      gridHeight: height,
      gridWidth: width,
      cellHeight,
      cellWidth,
    });
  }


  //CORE GAME LOGIC
  onImageCardPress(card) {
    const { selectedCards, matchedCards, preventPresses, currentLevel } = this.state;
    const { currentLevel: { memTime, numRows, numCols }, completeLevel } = this.props;
    if (!card.faceUp && !preventPresses) {
      const newSelectedCards = [...selectedCards, card];
      card.faceUp = true;
      if (newSelectedCards.length === 2) {
        //TODO add turn event
        if (newSelectedCards[0].imageID === newSelectedCards[1].imageID) {
          // match
          const newMatchedCards = [...matchedCards, ...newSelectedCards];
          //WIN LEVEL
          if (newMatchedCards.length === numRows * numCols) {
            completeLevel(currentLevel.id);
            const showCompleteTimer = setTimeout(() => {
              this.setState({ showCompleteDialog: true });
            }, 300);
          }
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

  playNextLevel() {
    const { chooseLevel, numLevels } = this.props;
    const { currentLevel } = this.state;
    const newLevelID = currentLevel.id + 1;
    if (newLevelID <= numLevels) {
      chooseLevel(newLevelID);
    }
    this.setState({ showCompleteDialog: false });
  }

  componentWillUnmount() {
    clearTimeout(this.state.noMatchTimer);
    clearTimeout(this.state.showCompleteTimer);
  }

  render() {
    const { cellHeight, cellWidth, cellMargin, cards, matchedCards, showCompleteDialog, currentLevel } = this.state;
    const { goToMenu, numLevels } = this.props;
    const gridItemStyle = {
      height: cellHeight,
      width: cellWidth,
      margin: cellMargin,
      borderRadius: 10,
    };
    const imageStyle = {
      height: cellHeight,
      width: cellWidth,
      flex: 1,
      borderRadius: 10,
    };
    return (
      <Fragment>
        <BoardControls currentLevelID={currentLevel.id} goToMenu={goToMenu} />
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
        { showCompleteDialog &&
          <Fragment>
            <View style={styles.completionOverlay} />
            <View style={styles.completionDialogContainer}>
              <View style={styles.completionDialog}>
                <Text style={styles.completionDialogTitle}>Level {currentLevel.id}</Text>
                <View style={styles.completeIconContainer}>
                  <Ionicons name='md-checkmark-circle' size={60} color='green' />
                  <Text style={{color: 'green'}}>Complete</Text>
                </View>
                <View style={styles.completionDialogButtonsContainer}>
                  { currentLevel.id < numLevels && <Button containerViewStyle={styles.button} backgroundColor={PRIMARY_COLOR} title={`Play Level ${currentLevel.id + 1}`} onPress={this.playNextLevel}/>}
                  <Button containerViewStyle={styles.button} backgroundColor={SECONDARY_COLOR} title="Menu" onPress={goToMenu} />
                </View>
              </View>
            </View>
          </Fragment>
        }
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
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 350,
    height: 300,
    backgroundColor: 'white',
    opacity: 1,
    shadowOffset: { width: -3, height: 3 },
    shadowRadius: 3,
    elevation: 2,
    shadowColor: 'black',
    shadowOpacity: 0.4,
  },
  completionDialogButtonsContainer: {
    width: '100%',
    alignItems: 'center',
  },
  completionDialogTitle: {
    fontSize: 28,
  },
  completeIconContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  button: {
    marginTop: 5,
    width: '80%',
    height: 50,
  },
});
