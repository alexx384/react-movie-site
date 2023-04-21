import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MovieListPage } from '.';

export default {
  title: 'Pages/MovieListPage',
  component: MovieListPage,
  parameters: {
    layout: 'fullscreen',
  },
} as ComponentMeta<typeof MovieListPage>;

const Template: ComponentStory<typeof MovieListPage> = (args) => (
  <MovieListPage />
);

export const Page = Template.bind({});
