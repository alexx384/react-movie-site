import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Multiselect } from '.';
import { DEFAULT_MOVIE_GENRES } from '../../constants/movieForm.constants';

export default {
  title: 'Stories/Multiselect',
  component: Multiselect,
} as ComponentMeta<typeof Multiselect>;

const Template: ComponentStory<typeof Multiselect> = (args) => (
  <Multiselect {...args} />
);

export const PrimaryMovieForm = Template.bind({});
PrimaryMovieForm.args = {
  options: DEFAULT_MOVIE_GENRES,
  placeholder: 'Select Genre',
};
