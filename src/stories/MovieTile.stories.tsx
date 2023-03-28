import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieTile } from '../components/MovieTile';

export default {
  title: 'Stories/MovieTile',
  component: MovieTile,
} as ComponentMeta<typeof MovieTile>;

const Template: ComponentStory<typeof MovieTile> = (args) => (
  <MovieTile {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  imageUrl: 'https://test-9mn.pages.dev/1.png',
  movieName: 'Pulp Fiction',
  releaseYear: 2004,
  genres: ['Action', 'Adventure'],
};
