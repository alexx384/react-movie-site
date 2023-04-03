import { ComponentStory, ComponentMeta } from '@storybook/react';
import { GenreItem } from '.';

export default {
  title: 'Stories/GenreSelect/GenreItem',
  component: GenreItem,
  argTypes: {
    onSelect: {
      action: 'onSelect',
    },
  },
} as ComponentMeta<typeof GenreItem>;

const Template: ComponentStory<typeof GenreItem> = (args) => (
  <GenreItem {...args} />
);

export const SelectedItem = Template.bind({});
SelectedItem.args = {
  genreName: 'ALL',
  isSelected: true,
};

export const UnselectedItem = Template.bind({});
UnselectedItem.args = {
  genreName: 'ALL',
  isSelected: false,
};
