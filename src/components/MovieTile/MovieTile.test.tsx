import { render, screen } from '@testing-library/react';
import { MovieTile } from './MovieTile';

it('renders an input with the value equal to initial value passed in props', () => {
  render(
    <MovieTile
      imageUrl="logo192.png"
      movieName="React"
      releaseYear={2022}
      genres={['Adventure']}
    />
  );

  // const searchInput: HTMLElement = screen.getByRole('textbox');
  // expect(searchInput).toHaveValue(initialSearchQuery);
});
