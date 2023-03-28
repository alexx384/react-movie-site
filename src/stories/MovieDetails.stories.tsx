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
  imageUrl: 'https://test-9mn.pages.dev/1.png',
  movieName: 'Pulp Fiction',
  releaseYear: 1994,
  rating: 8.9,
  genres: ['Adventure'],
  durationInSeconds: 9240,
  description:
    'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
};
