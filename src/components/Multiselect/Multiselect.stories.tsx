import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Multiselect } from '.';
import { DEFAULT_MOVIE_GENRES } from '../../constants/movieForm.constants';
import React from 'react';

export default {
  title: 'Stories/Multiselect',
  component: Multiselect,
} as ComponentMeta<typeof Multiselect>;

const Template: ComponentStory<typeof Multiselect> = (args) => {
  const [selectedOptions, setSelectedOptions] = React.useState(
    new Set<string>()
  );
  const handleMultiselectChange = (newSelectedOptions: Set<string>) => {
    setSelectedOptions(new Set(newSelectedOptions));
  };
  return (
    <Multiselect
      {...args}
      initiallySelectedOptions={selectedOptions}
      onChange={handleMultiselectChange}
    />
  );
};

export const PrimaryMovieForm = Template.bind({});
PrimaryMovieForm.args = {
  options: DEFAULT_MOVIE_GENRES,
  placeholder: 'Select Genre',
};
