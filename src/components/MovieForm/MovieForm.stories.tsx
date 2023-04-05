import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { MovieForm } from '.';

export default {
  title: 'Stories/Dialog',
  component: MovieForm,
} as ComponentMeta<typeof MovieForm>;

const Template: ComponentStory<typeof MovieForm> = (args) => (
  <MovieForm {...args} />
);

export const PrimaryMovieForm = Template.bind({});
