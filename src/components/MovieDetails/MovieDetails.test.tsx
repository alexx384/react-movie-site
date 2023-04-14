import { MovieDetails } from './MovieDetails';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MovieDetails
        id="1"
        imageUrl="logo192.png"
        movieName="React"
        releaseYear={2022}
        rating={8.9}
        genre="Adventure"
        durationInSeconds={9240}
        description="Whether you work on your own or with thousands of other developers, using React feels the same. It is designed to let you seamlessly combine components written by independent people, teams, and organizations."
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
