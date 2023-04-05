import { ComponentStory, ComponentMeta } from '@storybook/react';
import React from 'react';
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
  isInitiallyChecked: true,
  id: 'one',
  value: 'One',
};

export const UncheckedCheckbox = Template.bind({});
UncheckedCheckbox.args = {
  isInitiallyChecked: false,
  id: 'one',
  value: 'One',
};
