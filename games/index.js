import Addition from './Addition';
import FaceMatching from './FaceMatching';

const games = [
  {
    id: 1,
    name: 'Addition',
    category: 'Arithmetic',
    image_source: require('./Addition/addition.jpg'),
    game: Addition,
  },
  {
    id: 2,
    name: 'Face Matching',
    category: 'Visual Memory',
    image_source: require('./FaceMatching/face-matching.jpg'),
    game: FaceMatching,
  },
];

export default games;
