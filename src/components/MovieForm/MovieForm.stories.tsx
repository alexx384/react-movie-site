import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieForm } from '.';
import { TEST_MOVIE_INFO } from '../../constants/movieForm.constants';

export default {
  title: 'Stories/MovieForm',
  component: MovieForm,
} as ComponentMeta<typeof MovieForm>;

const Template: ComponentStory<typeof MovieForm> = (args) => (
  <MovieForm {...args} />
);

export const UnfilledMovieForm = Template.bind({});

export const FilledMovieForm = Template.bind({});
FilledMovieForm.args = {
  movieInfo: TEST_MOVIE_INFO,
};
