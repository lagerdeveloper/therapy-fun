import Sudoku from './Sudoku';
import ImageMatching from './ImageMatching';

const games = [
  {
    id: 1,
    name: 'Sudoku',
    category: 'Arithmetic',
    image_source: require('./Sudoku/sudoku.jpg'),
    game: Sudoku,
  },
  {
    id: 2,
    name: 'Image Matching',
    category: 'Visual Memory',
    image_source: require('./ImageMatching/Images/background.jpg'),
    game: ImageMatching,
  },
];

export default games;
