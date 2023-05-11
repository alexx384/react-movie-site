import { MovieDetails } from './MovieDetails';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <MovieDetails
        id={1}
        movieURL="logo192.png"
        title="React"
        releaseDate={new Date(2022, 0)}
        rating={8.9}
        genreIds={new Set(['adventure'])}
        runtime={154}
        overview="Whether you work on your own or with thousands of other developers, using React feels the same. It is designed to let you seamlessly combine components written by independent people, teams, and organizations."
      />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
