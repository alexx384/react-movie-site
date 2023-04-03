import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GenreSelect } from '.';

export default {
  title: 'Stories/GenreSelect',
  component: GenreSelect,
  argTypes: {
    onSelectGenre: {
      action: 'onSelectGenre',
    },
  },
} as ComponentMeta<typeof GenreSelect>;

const Template: ComponentStory<typeof GenreSelect> = (args) => (
  <GenreSelect {...args} />
);

export const PrimarySelect = Template.bind({});
PrimarySelect.args = {
  listOfGenres: ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'],
  initiallySelectedGenreName: 'COMEDY',
};

export const IncorrectSelect = Template.bind({});
IncorrectSelect.args = {
  listOfGenres: ['ALL', 'DOCUMENTARY', 'COMEDY', 'HORROR', 'CRIME'],
  initiallySelectedGenreName: '',
};
