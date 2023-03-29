import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuContext } from '../components/MenuContext';

export default {
  title: 'Stories/MenuContext',
  component: MenuContext,
} as ComponentMeta<typeof MenuContext>;

const Template: ComponentStory<typeof MenuContext> = (args) => (
  <MenuContext {...args} />
);

export const PrimarySelect = Template.bind({});
PrimarySelect.args = {
  children: <h1>Hello World</h1>,
  menuItems: ['Edit', 'Delete'],
};
