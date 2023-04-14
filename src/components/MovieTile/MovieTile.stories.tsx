import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieTile } from '.';

export default {
  title: 'Stories/MovieTile',
  component: MovieTile,
} as ComponentMeta<typeof MovieTile>;

const Template: ComponentStory<typeof MovieTile> = (args) => (
  <MovieTile {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  info: {
    id: '1',
    imageUrl: 'https://test-9mn.pages.dev/1.png',
    movieName: 'Pulp Fiction',
    releaseYear: 2004,
    genre: 'Action & Adventure',
  },
};
