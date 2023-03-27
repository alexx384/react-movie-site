import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieDetails } from '../components/MovieDetails';

export default {
  title: 'Stories/MovieDetails',
  component: MovieDetails,
} as ComponentMeta<typeof MovieDetails>;

const Template: ComponentStory<typeof MovieDetails> = (args) => (
  <MovieDetails {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  imageUrl: 'logo192.png',
  movieName: 'React',
  releaseYear: 2022,
  rating: 8.9,
  genres: ['Adventure'],
  durationInSeconds: 9240,
  description:
    'Whether you work on your own or with thousands of other developers, using React feels the same. It is designed to let you seamlessly combine components written by independent people, teams, and organizations.',
};
