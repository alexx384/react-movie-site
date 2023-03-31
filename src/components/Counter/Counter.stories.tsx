import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Counter } from '.';

export default {
  title: 'Stories/Counter',
  component: Counter,
} as ComponentMeta<typeof Counter>;

const Template: ComponentStory<typeof Counter> = (args) => (
  <Counter {...args} />
);

export const CounterZero = Template.bind({});
CounterZero.args = {
  initialValue: 0,
};

export const CounterMinusFive = Template.bind({});
CounterMinusFive.args = {
  initialValue: -5,
};

export const CounterFive = Template.bind({});
CounterFive.args = {
  initialValue: 5,
};
