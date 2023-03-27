import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SortControl } from '../components/SortControl';

export default {
  title: 'Stories/SortControl',
  component: SortControl,
} as ComponentMeta<typeof SortControl>;

const Template: ComponentStory<typeof SortControl> = (args) => (
  <SortControl {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
  options: ['RELEASE DATE', 'TITLE'],
  selectedOption: 'RELEASE DATE',
};
