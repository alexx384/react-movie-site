import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
import { MovieForm } from '.';

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
  movieInfo: {
    title: 'Moana',
    releaseDate: new Date('2016-11-14T00:00:00.000Z'),
    movieURL: 'https://www.moana.com',
    rating: 7.6,
    genre: new Set(['comedy']),
    runtime: 107,
    overview:
      "Moana Waialiki is a sea voyaging enthusiast and the only daughter of a chief in a long line of navigators. When her island's fishermen can't catch any fish and the crops fail, she learns that the demigod Maui caused the blight by stealing the heart of the goddess, Te Fiti. The only way to heal the island is to persuade Maui to return Te Fiti's heart, so Moana sets off on an epic journey across the Pacific. The film is based on stories from Polynesian mythology.",
  },
};
