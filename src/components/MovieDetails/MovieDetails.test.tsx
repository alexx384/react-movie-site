import { render, screen } from '@testing-library/react';
import { MovieDetails } from './MovieDetails';

it('renders an input with the value equal to initial value passed in props', () => {
  render(
    <MovieDetails
      imageUrl="logo192.png"
      movieName="React"
      releaseYear={2022}
      rating={8.9}
      genres={['Adventure']}
      durationInSeconds={9240}
      description="Whether you work on your own or with thousands of other developers, using React feels the same. It is designed to let you seamlessly combine components written by independent people, teams, and organizations."
    />
  );

  // const searchInput: HTMLElement = screen.getByRole('textbox');
  // expect(searchInput).toHaveValue(initialSearchQuery);
});
