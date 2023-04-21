import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieListResult } from '.';
import { MOVIE_LIST_ITEMS6 } from '../../../constants/tests.constants';

export default {
  title: 'Stories/MovieListResult',
  component: MovieListResult,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MovieListResult>;

const Template: ComponentStory<typeof MovieListResult> = (args) => (
  <MovieListResult {...args} />
);

export const Full = Template.bind({});
Full.args = {
  movieList: MOVIE_LIST_ITEMS6,
};

export const Four = Template.bind({});
Four.args = {
  movieList: MOVIE_LIST_ITEMS6.slice(0, 4),
};

export const Empty = Template.bind({});
Empty.args = {
  movieList: [],
};

export const Seven = Template.bind({});
Seven.args = {
  movieList: [
    ...MOVIE_LIST_ITEMS6,
    {
      id: '7',
      imageUrl: 'https://test-9mn.pages.dev/1.png',
      movieName: 'Pulp Fiction',
      releaseYear: 2004,
      genre: 'Action & Adventure',
    },
  ],
};
