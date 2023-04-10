import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from '.';

export default {
  title: 'Stories/Multiselect/Checkbox',
  component: Checkbox,
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => (
  <Checkbox {...args} />
);

export const CheckedCheckbox = Template.bind({});
CheckedCheckbox.args = {
  isChecked: true,
  id: 'one',
  value: 'One',
};

export const UncheckedCheckbox = Template.bind({});
UncheckedCheckbox.args = {
  isChecked: false,
  id: 'one',
  value: 'One',
};
