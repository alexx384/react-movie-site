import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieTile } from '.';
import movieURL from '../../assets/1.png';

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
    id: 1,
    movieURL: movieURL,
    title: 'Pulp Fiction',
    releaseDate: new Date(2004, 0),
    genreIds: new Set(['Action', 'Adventure']),
  },
};
