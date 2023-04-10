import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Multiselect } from '.';

export default {
  title: 'Stories/Multiselect',
  component: Multiselect,
} as ComponentMeta<typeof Multiselect>;

const Template: ComponentStory<typeof Multiselect> = (args) => (
  <Multiselect {...args} />
);

export const PrimaryMovieForm = Template.bind({});
PrimaryMovieForm.args = {
  options: [
    { id: 'crime', value: 'Crime', isChecked: false },
    { id: 'documentary', value: 'Documentary', isChecked: false },
    { id: 'horror', value: 'Horror', isChecked: false },
    { id: 'comedy', value: 'Comedy', isChecked: false },
  ],
  placeholder: 'Select Genre',
};
