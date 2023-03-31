import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuContext } from '.';

export default {
  title: 'Stories/MenuContext',
  component: MenuContext,
  parameters: {
    docs: {
      description: {
        component:
          'We can invoke context menu on any component inside **MenuContext** block. Try it by clicking on the _Hello World_ using your the right mouse click.',
      },
    },
  },
} as ComponentMeta<typeof MenuContext>;

const Template: ComponentStory<typeof MenuContext> = (args) => (
  <MenuContext {...args}>
    <h1 style={{ color: '#ffffff' }}>Hello World</h1>
  </MenuContext>
);

export const PrimarySelect = Template.bind({});
PrimarySelect.args = {
  menuItems: ['Edit', 'Delete'],
};
