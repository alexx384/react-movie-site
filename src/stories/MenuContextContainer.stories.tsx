import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MenuContextContainer } from '../components/MenuContextContainer';

export default {
  title: 'Stories/MenuContextContainer',
  component: MenuContextContainer,
} as ComponentMeta<typeof MenuContextContainer>;

const Template: ComponentStory<typeof MenuContextContainer> = (args) => (
  <MenuContextContainer {...args} />
);

export const PrimarySelect = Template.bind({});
PrimarySelect.args = {
  absolutePositionX: 0,
  absolutePositionY: 0,
  items: ['Edit', 'Delete'],
  width: '150px',
};
