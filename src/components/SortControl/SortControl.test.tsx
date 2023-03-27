import { render, screen } from '@testing-library/react';
import { SortControl } from './SortControl';

it('renders a genreName', () => {
  render(
    <SortControl
      options={['RELEASE DATE', 'TITLE']}
      selectedOption={'RELEASE DATE'}
    />
  );

  // const listItem: HTMLLIElement = screen.getByRole('listitem');
  // expect(listItem).toHaveTextContent(genreName);
});
