import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuContextContainer } from '.';

export default {
  title: 'Stories/MenuContextContainer',
  component: MenuContextContainer,
} as ComponentMeta<typeof MenuContextContainer>;

const Template: ComponentStory<typeof MenuContextContainer> = (args) => (
  <MenuContextContainer {...args} />
);

export const PrimarySelect = Template.bind({});
PrimarySelect.args = {
  menuItems: ['Edit', 'Delete'],
};
