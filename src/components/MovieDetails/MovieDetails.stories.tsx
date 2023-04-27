import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieDetails } from '.';
import imageURL from '../../assets/1.png';

export default {
  title: 'Stories/MovieDetails',
  component: MovieDetails,
} as ComponentMeta<typeof MovieDetails>;

const Template: ComponentStory<typeof MovieDetails> = (args) => (
  <MovieDetails {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  movieURL: imageURL,
  title: 'Pulp Fiction',
  releaseDate: new Date(1994, 0),
  rating: 8.9,
  genreIds: new Set(['Adventure']),
  runtime: 9240,
  overview:
    'Jules Winnfield (Samuel L. Jackson) and Vincent Vega (John Travolta) are two hit men who are out to retrieve a suitcase stolen from their employer, mob boss Marsellus Wallace (Ving Rhames). Wallace has also asked Vincent to take his wife Mia (Uma Thurman) out a few days later when Wallace himself will be out of town. Butch Coolidge (Bruce Willis) is an aging boxer who is paid by Wallace to lose his fight. The lives of these seemingly unrelated people are woven together comprising of a series of funny, bizarre and uncalled-for incidents.—Soumitra',
};
